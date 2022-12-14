export const THEMES_NAMES = {
  light: "light",
  dark: "dark",
};

export const THEME_COOKIE = "mantine-color-scheme";

export const PROFILE_PATH = ["profile"];
export const ADD_ITEM_PATH = [...PROFILE_PATH, "add_item"];
export const SIGNUP_PATH = ["signup"];
export const LOGIN_PATH = ["login"];
export const CREDITS_PATH = ["credits"];
export const ACCOUNT_CREATED_PATH = ["accountCreated"];
export const ITEM_DISPLAY_PATH = (itemId) => ["items", itemId];
export const OWN_ITEM_PATH = (itemId) => [...PROFILE_PATH, "item", itemId];
export const CART_PATH = ["cart"];
export const SEARCH_TAGS_PATH = ["searchTags"];
export const SEND_RESET_PASSWORD_EMAIL_PATH = ["sendResetPasswordEmail"];

export const shadedBoxVariants = {
  default: "default",
  wide: "wide",
};

export const BACKEND_MEDIA_URL = "media";
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

// Errors
export const NO_ITEM_FOUND_ERROR = "Item matching query does not exist.";

// messages
export const NO_TAGS_MESSAGE = "You need to add at least one tag";
