export const THEMES_NAMES = {
  light: "light",
  dark: "dark",
};

export const THEME_COOKIE = "mantine-color-scheme";

export const PROFILE_PATH = ["profile"];
export const ADD_ITEM_PATH = [...PROFILE_PATH, "add_item"];
export const SIGNUP_PATH = ["signup"];
export const LOGIN_PATH = ["login"];
export const ACCOUNT_CREATED_PATH = ["accountCreated"];
export const ITEM_DISPLAY_PATH = (itemId) => ["items", itemId];
export const OWN_ITEM_PATH = (itemId) => [...PROFILE_PATH, "item", itemId];
export const CART_PATH = ["cart"];
export const SEARCH_TAGS_PATH = ["searchTags"];

export const shadedBoxVariants = {
  default: "default",
  wide: "wide",
};

// export const BACKEND_URL = "http://localhost:8000";
export const BACKEND_URL = "http://127.0.0.1:8000";
export const BACKEND_MEDIA_URL = "media";

// Errors
export const NO_ITEM_FOUND_ERROR = "Item matching query does not exist.";
