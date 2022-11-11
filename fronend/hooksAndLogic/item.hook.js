import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { client } from "apolloClient";
import { FragmentsOnCompositeTypesRule } from "graphql";
import { itemGraphqlQueryFields } from "helpers/gqlQueries";
import { PROFILE_PATH } from "helpers/strings";
import { createPath, notifyFormErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { addUserItem } from "store/slices/userSlice";
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
      // title: (value) =>
      //   value.length < 3 ? "Title must be at least 3 characters long" : null,
      // description: (value) =>
      //   value.length < 5 ? "Description is too short" : null,
      // price: (value) =>
      //   value.length < 1 || value < 0 ? "Price is too low" : null,
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

  const handleAddItem = async (mutate, { values, tags, image }) => {
    dispatch(setLoading(true));
    const currentTags = tags.filter((tag) => !tag.newTag).map((tag) => tag.id);
    const newTags = tags.filter((tag) => tag.newTag).map((tag) => tag.text);

    // debugger;

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
      onCompleted: (data) => {
        console.log("61: data >>>", data);
      },
      onError: (error) => {
        console.log("80: error >>>", error);
      },
    });
    // const mutation = gql`
    //   mutation {
    //     createItem(
    //       title:"${values.title}",
    //       published:${values.published},
    //       description:"${values.description}",
    //       seller:"${sellerUsername}",
    //       tags:${JSON.stringify(currentTags.map((tag) => tag.id))},
    //       newTags:${JSON.stringify(newTags.map((tag) => tag.text))},
    //       image: $file,
    //       price:"${values.price}"
    //     ) {
    //        __typename
    //       ... on CreateItemFailed {
    //         errorMessage
    //       }
    //       ... on CreateItemSuccess {
    //         item {
    //           ${itemGraphqlQueryFields}
    //         }
    //       }
    //     }
    //   }
    // `;

    // try {
    //   const { data } = await client.mutate({ mutation: mutation });
    //   if (data.createItem.__typename === "CreateItemFailed") {
    //     showNotification({
    //       title: "Error",
    //       message: data.createItem.errorMessage,
    //       color: "red",
    //     });
    //   }
    //   if (data.createItem.__typename === "CreateItemSuccess") {
    //     showNotification({
    //       title: "Success",
    //       message: "Item added successfully",
    //       color: "green",
    //     });
    //     dispatch(addUserItem(data.createItem.item));
    //     router.push(createPath(PROFILE_PATH));
    //   }
    // } catch (e) {
    //   console.log("There is an error in the mutation", e);
    // }
    dispatch(setLoading(false));
  };

  return {
    mutation,
    formSettings,
    handleAddItem,
    handleFormErrors: notifyFormErrors,
  };
};
