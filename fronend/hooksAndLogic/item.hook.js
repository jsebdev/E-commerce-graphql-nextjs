import { gql } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { client } from "apolloClient";
import { itemGraphqlQueryFields } from "helpers/queries";
import { notifyFormErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { useUserItems } from "./user.hook";

export const useItem = (sellerUsername, dispatch, router) => {
  const formSettings = {
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      published: true,
    },
    validate: {
      title: (value) =>
        value.length < 3 ? "Title must be at least 3 characters long" : null,
      description: (value) =>
        value.length < 5 ? "Description is too short" : null,
    },
  };

  const handleAddItem = async (values, tags) => {
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
          newTags:${JSON.stringify(newTags.map((tag) => tag.text))}
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
        const { fetchUserItems } = useUserItems(sellerUsername, dispatch);
        await fetchUserItems();
        router.push("/profile");
      }
    } catch (e) {
      console.log("There is an error in the mutation", e);
    }
    dispatch(setLoading(false));
  };

  return { formSettings, handleAddItem, handleFormErrors: notifyFormErrors };
};
