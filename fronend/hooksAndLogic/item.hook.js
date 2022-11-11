import { gql } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { client } from "apolloClient";
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
      title: (value) =>
        value.length < 3 ? "Title must be at least 3 characters long" : null,
      description: (value) =>
        value.length < 5 ? "Description is too short" : null,
      price: (value) =>
        value.length < 1 || value < 0 ? "Price is too low" : null,
    },
  };

  const handleAddItem = async (values, tags, image) => {
    dispatch(setLoading(true));
    const currentTags = tags.filter((tag) => !tag.newTag);
    const newTags = tags.filter((tag) => tag.newTag);
    const query = gql`
      mutation {
        createItem(
          title:"${values.title}",
          published:${values.published}, 
          description:"${values.description}",
          seller:"${sellerUsername}", 
          tags:${JSON.stringify(currentTags.map((tag) => tag.id))},
          newTags:${JSON.stringify(newTags.map((tag) => tag.text))},
          image: "${image}",
          price:"${values.price}"
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
    try {
      const { data } = await client.mutate({ mutation: query });
      if (data.createItem.__typename === "CreateItemFailed") {
        showNotification({
          title: "Error",
          message: data.createItem.errorMessage,
          color: "red",
        });
      }
      if (data.createItem.__typename === "CreateItemSuccess") {
        showNotification({
          title: "Success",
          message: "Item added successfully",
          color: "green",
        });
        // console.log("fetching user items after adding one");
        // await fetchUserItems(sellerUsername, dispatch);
        dispatch(addUserItem(data.createItem.item));
        router.push(createPath(PROFILE_PATH));
      }
    } catch (e) {
      console.log("There is an error in the mutation", e);
    }
    dispatch(setLoading(false));
  };

  return { formSettings, handleAddItem, handleFormErrors: notifyFormErrors };
};
