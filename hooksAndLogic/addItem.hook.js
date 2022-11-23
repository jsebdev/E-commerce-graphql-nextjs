import { showNotification } from "@mantine/notifications";
import { CREATE_ITEM, mutateAnswers } from "helpers/gqlQueries";
import { PROFILE_PATH } from "helpers/strings";
import { createPath, customErrorMessage } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { addUserItem, setItemsFetched } from "store/slices/userSlice";
import { fetchUserItems } from "./user.logic";

export const useAddItem = (sellerUsername, dispatch, router, client) => {
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

  const mutation = CREATE_ITEM;

  const handleAddItem = async (
    mutate,
    { values, tags, image, itemsFetched, error }
  ) => {
    if (error) return;
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
        if (data.createItem.__typename === mutateAnswers.error) {
          showNotification({
            title: "Error",
            message: customErrorMessage(data.createItem.errorMessage),
            color: "red",
          });
        }
        if (data.createItem.__typename === mutateAnswers.editSuccess) {
          showNotification({
            title: "Success",
            message: "Item added successfully",
            color: "green",
          });
          console.log("64: itemsFetched >>>", itemsFetched);
          if (!itemsFetched) {
            console.log("fetching items in add item hook");
            await fetchUserItems(sellerUsername, dispatch, client);
          }
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
  };
};
