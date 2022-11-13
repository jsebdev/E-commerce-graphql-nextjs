import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { client } from "apolloClient";
import { FragmentsOnCompositeTypesRule } from "graphql";
import { itemGraphqlQueryFields } from "helpers/gqlQueries";
import { PROFILE_PATH } from "helpers/strings";
import {
  createPath,
  customErrorMessage,
  notifyFormErrors,
} from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { addUserItem, setItemsFetched } from "store/slices/userSlice";
import { fetchUserItems, useUserItems } from "./user.logic";

export const useItem = (sellerUsername, dispatch, router) => {
  const formSettings = {
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      price: 0,
      published: true,
    },
    validate: {
      title: (value) =>
        value.length < 3 ? "Title must be at least 3 characters long" : null,
      description: (value) =>
        value.length < 5 ? "Description is too short" : null,
      price: (value) =>
        value.length < 1 || value < 0 ? "Price is too low" : null,
    },
  };

  const mutation = gql`
      mutation CreateItem($title: String!,
                          $subtitle: String!,
                          $description: String!,
                          $published: Boolean!,
                          $price: Decimal!,
                          $seller: String!,
                          $tags: [ID!]!,
                          $newTags: [String!]!,
                          $image: Upload) {
        createItem(
          title:$title,
          subtitle:$subtitle,
          description:$description,
          published:$published,, 
          price:$price
          seller:$seller, 
          tags:$tags,
          newTags:$newTags,
          image: $image,
        ) {
           __typename
          ... on CreateItemFailed {
            errorMessage
          }
          ... on CreateItemSuccess {
            item {
              ${itemGraphqlQueryFields}
            }
          }
        }
      }
    `;

  const handleAddItem = async (
    mutate,
    { values, tags, image },
    itemsFetched
  ) => {
    dispatch(setLoading(true));
    const currentTags = tags.filter((tag) => !tag.newTag).map((tag) => tag.id);
    const newTags = tags.filter((tag) => tag.newTag).map((tag) => tag.text);
    mutate({
      variables: {
        title: values.title,
        subtitle: values.subtitle,
        published: values.published,
        description: values.description,
        seller: sellerUsername,
        tags: currentTags,
        newTags: newTags,
        price: values.price,
        image: image,
      },
      onCompleted: async (data) => {
        console.log("61: data >>>", data);
        if (data.createItem.__typename === "CreateItemFailed") {
          showNotification({
            title: "Error",
            message: customErrorMessage(data.createItem.errorMessage),
            color: "red",
          });
        }
        if (data.createItem.__typename === "CreateItemSuccess") {
          showNotification({
            title: "Success",
            message: "Item added successfully",
            color: "green",
          });
          if (!itemsFetched) await fetchUserItems(sellerUsername, dispatch);
          dispatch(setItemsFetched(true));
          dispatch(addUserItem(data.createItem.item));
          router.push(createPath(PROFILE_PATH));
        }
        dispatch(setLoading(false));
      },
      onError: (error) => {
        console.log("There is an error in the mutation", error);
        dispatch(setLoading(false));
      },
    });
  };

  return {
    mutation,
    formSettings,
    handleAddItem,
    handleFormErrors: notifyFormErrors,
  };
};
