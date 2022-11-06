export const THEMES_NAMES = {
  light: "light",
  dark: "dark",
};

export const THEME_COOKIE = "mantine-color-scheme";

export const PROFILE_PATH = ["profile"];
export const ADD_ITEM_PATH = [PROFILE_PATH, "add_item"];
export const OWN_ITEM_PATH = (itemId) => [PROFILE_PATH, itemId];
export const SIGNUP_PATH = ["signup"];
export const LOGIN_PATH = ["login"];
export const ACCOUNT_CREATED_PATH = ["accountCreated"];
export const ITEM_DISPLAY_PATH = (itemId) => ["items", itemId];
export const CART_PATH = ["cart"];

export const shadedBoxVariants = {
  default: "default",
  wide: "wide",
};
