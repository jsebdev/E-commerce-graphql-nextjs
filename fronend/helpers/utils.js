import { showNotification } from "@mantine/notifications";
import { formatRelative } from "date-fns";

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

export const formatDate = (date) => {
  // const formatedDate = formatDistance(new Date(date), )
  const formattedDate = formatRelative(new Date(date), new Date());
  return formattedDate;
};

export const shadedBackground = (theme) =>
  theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1];
