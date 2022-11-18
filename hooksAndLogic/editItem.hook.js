import { gql } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import {
  DELETE_ITEM,
  EDIT_ITEM,
  itemGraphqlQueryFields,
  mutateAnswers,
} from "helpers/gqlQueries";
import { PROFILE_PATH } from "helpers/strings";
import { createPath, customErrorMessage } from "helpers/utils";
import { removeCartItem, updateCartItem } from "store/slices/cartSlice";
import { setLoading } from "store/slices/loaderSlice";
import {
  addUserItem,
  deleteUserItem,
  modifyUserItem,
  setItemsFetched,
} from "store/slices/userSlice";
import { fetchUserItems } from "./user.logic";

export const useEditItem = (
  sellerUsername,
  dispatch,
  router,
  { id, title, subtitle, description, price, published },
  itemsFetched
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

  const editMutation = EDIT_ITEM;

  const handleEditItem = async (mutate, { values, tags, image }) => {
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
        image: image,
      },
      onCompleted: async ({ modifyItem: answer }) => {
        if (answer.__typename === mutateAnswers.error) {
          showNotification({
            title: "Error",
            message: customErrorMessage(answer.errorMessage),
            color: "red",
          });
        }
        if (answer.__typename === mutateAnswers.editSuccess) {
          showNotification({
            title: "Success",
            message: "Item modified successfully",
            color: "green",
          });
          if (!itemsFetched) {
            await fetchUserItems(sellerUsername, dispatch);
            dispatch(setItemsFetched(true));
          }
          dispatch(modifyUserItem(answer.item));
          dispatch(updateCartItem(answer.item));
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

  const deleteMutation = DELETE_ITEM;

  const handleDeleteItem = (mutate) => {
    mutate({
      variables: { id: id },
      onCompleted: async ({ deleteItem: answer }) => {
        if (answer.__typename === mutateAnswers.deleteSuccess) {
          showNotification({
            title: "Success",
            message: "Item deleted successfully",
            color: "green",
          });
          if (!itemsFetched) {
            console.log("fetching items in edit item hook");
            await fetchUserItems(sellerUsername, dispatch);
            dispatch(setItemsFetched(true));
          }
          dispatch(deleteUserItem(id));
          dispatch(removeCartItem(id));
          router.push(createPath(PROFILE_PATH));
        }
        if (answer.__typename === mutateAnswers.error) {
          showNotification({
            title: "Error",
            message: customErrorMessage(answer.errorMessage),
            color: "red",
          });
        }
        dispatch(setLoading(false));
      },
      onError: (error) => {
        console.log("There is an error in the delete mutation", error);
        dispatch(setLoading(false));
      },
    });
  };

  return {
    editMutation,
    deleteMutation,
    formSettings,
    handleEditItem,
    handleDeleteItem,
  };
};
