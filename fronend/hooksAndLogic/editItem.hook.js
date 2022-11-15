import { gql } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  EDIT_ITEM,
  itemGraphqlQueryFields,
  mutateAnswers,
} from "helpers/gqlQueries";
import { PROFILE_PATH } from "helpers/strings";
import { createPath, customErrorMessage } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import {
  addUserItem,
  modifyUserItem,
  setItemsFetched,
} from "store/slices/userSlice";
import { fetchUserItems } from "./user.logic";

export const useEditItem = (
  sellerUsername,
  dispatch,
  router,
  { id, title, subtitle, description, price, published }
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

  const mutation = EDIT_ITEM;

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
        id: id,
        title: values.title,
        subtitle: values.subtitle,
        published: values.published,
        description: values.description,
        tags: currentTags,
        newTags: newTags,
        price: values.price,
        // image: image,
      },
      onCompleted: async ({ modifyItem: answer }) => {
        if (answer.__typename === mutateAnswers.error) {
          showNotification({
            title: "Error",
            message: customErrorMessage(answer.errorMessage),
            color: "red",
          });
        }
        if (answer.__typename === mutateAnswers.success) {
          showNotification({
            title: "Success",
            message: "Item modified successfully",
            color: "green",
          });
          if (!itemsFetched) await fetchUserItems(sellerUsername, dispatch);
          dispatch(setItemsFetched(true));
          dispatch(modifyUserItem(answer.item));
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
