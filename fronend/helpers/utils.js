import { showNotification } from "@mantine/notifications";

export const handleFormErrors = (errors) => {
  Object.keys(errors).forEach((key) => {
    showNotification({
      title: "Oh no!",
      message: errors[key],
      color: "red",
    });
  });
};
