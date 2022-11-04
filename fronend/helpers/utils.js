import { showNotification } from "@mantine/notifications";

export const notifyFormErrors = (errors) => {
  notifyErrors(Object.values(errors));
};

export const notifyErrors = (errors) => {
  errors.forEach((error) => {
    showNotification({
      title: "Oh no!",
      message: error,
      color: "red",
    });
  });
};

export const createPath = (path) => `/${path.join("/")}`;
