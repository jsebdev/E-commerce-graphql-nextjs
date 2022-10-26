import { setSearchText } from "store/searchSlice";

export const resetWebsite = (dispatch, router) => {
  dispatch(setSearchText(""));
  router.push("/");
};
