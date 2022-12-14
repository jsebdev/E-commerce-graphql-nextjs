import { showNotification } from "@mantine/notifications";
import { formatRelative } from "date-fns";
import { BACKEND_URL, BACKEND_MEDIA_URL } from "helpers/strings";

export const notifyFormErrors = (errors) => {
  notifyErrors(Object.values(errors));
};

export const notifyErrors = (errors) => {
  errors.forEach(notifyError);
};

export const notifyError = (error) => {
  showNotification({
    message: error,
    color: "red",
  });
};

export const createPath = (path) => `/${path.join("/")}`;

export const formatDate = (date) => {
  const formattedDate = formatRelative(new Date(date), new Date());
  return formattedDate;
};

export const shadedBackground = (theme) =>
  theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1];

export const highlightedShadedBackground = (theme) =>
  theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.dark[3];

export const highlightedTextShaded = (theme) =>
  theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[1];

export const fullImagePath = (imagePath) =>
  `${BACKEND_URL}/${BACKEND_MEDIA_URL}/${imagePath}?${new Date().getTime()}`;

export const myImageLoader = ({ src, width, quality }) => {
  return src ? fullImagePath(src) : "/images/no-photo.png";
};

export const itemImageSource = (image) =>
  image ? fullImagePath(image) : "/images/no-photo.png";

export const customErrorMessage = (errorMessage) => {
  if (
    errorMessage.includes("UNIQUE constraint failed: shop_item.title") ||
    (errorMessage.includes("duplicate key value violates unique constraint") &&
      errorMessage.includes("title"))
  ) {
    return "There is already an item with this title";
  }
  return errorMessage;
};

export const roundPrice = (price) => Math.round(price * 100) / 100;

export const allTagsWidthContainer = (tags, windowWidth) => {
  const n = tags.length;
  const widthIncrement = 60;
  const tagsIncrement = 6;
  const breakpoint = (tagsIncrement * windowWidth) / widthIncrement;
  if (n < breakpoint) {
    return "100%";
  } else {
    const overload = n - breakpoint;
    return parsePixels(
      windowWidth + (overload * widthIncrement) / tagsIncrement
    );
  }
};

const parsePixels = (pixels) => `${Math.round(pixels * 100) / 100}px`;

export const printObjLog = (obj, tag = "NoTag") => {
  if (process.env.NEXT_PUBLIC_SHOW_LOGS === "1") {
    if (tag) console.log(tag);
    console.log(obj);
  }
};
