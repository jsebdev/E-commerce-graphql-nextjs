import { gql } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { itemGraphqlQueryFields, mutateAnswers } from "helpers/gqlQueries";
import { PROFILE_PATH } from "helpers/strings";
import { createPath, customErrorMessage } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { addUserItem, setItemsFetched } from "store/slices/userSlice";
import { fetchUserItems } from "./user.logic";

export const useEditItem = (
  sellerUsername,
  dispatch,
  router,
  { title, subtitle, description, price, published }
) => {
  const formSettings = {
    initialValues: { title, subtitle, description, price, published },
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
          ... on ${mutateAnswers.error} {
            errorMessage
          }
          ... on ${mutateAnswers.success} {
            item {
              ${itemGraphqlQueryFields}
            }
          }
        }
      }
    `;

  const handleEditItem = async (
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
        if (data.createItem.__typename === mutateAnswers.error) {
          showNotification({
            title: "Error",
            message: customErrorMessage(data.createItem.errorMessage),
            color: "red",
          });
        }
        if (data.createItem.__typename === mutateAnswers.success) {
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
    handleEditItem,
  };
};
