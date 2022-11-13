import { showNotification } from "@mantine/notifications";
import { formatRelative } from "date-fns";
import { BACKEND_URL, BACKEND_MEDIA_URL } from "helpers/strings";

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

export const fullImagePath = (imagePath) =>
  `${BACKEND_URL}/${BACKEND_MEDIA_URL}/${imagePath}`;

export const customErrorMessage = (errorMessage) => {
  if (errorMessage === "UNIQUE constraint failed: shop_item.title") {
    return "There is already an item with this title";
  }
  return errorMessage;
};
