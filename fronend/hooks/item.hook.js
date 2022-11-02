import { showNotification } from "@mantine/notifications";

export const useItem = () => {
  const formSettings = {
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      published: true,
      tags: [],
    },
    validate: {
      title: (value) =>
        value.length < 3 ? "Title must be at least 3 characters long" : null,
      description: (value) =>
        value.length < 10 ? "Description is too short" : null,
    },
  };
  const handleAddItem = async (e) => {
    console.log("20: e >>>", e);
    // e.preventDefault();
    // console.log(e.target.title.value);
  };
  const handleErrors = (errors) => {
    console.log("there are errors", errors);
    Object.keys(errors).forEach((key) => {
      showNotification({
        title: "Oh no!",
        message: errors[key],
        color: "red",
      });
    });
  };
  return { formSettings, handleAddItem, handleErrors };
};
