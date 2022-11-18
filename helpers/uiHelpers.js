import { setSearchText } from "store/slices/searchSlice";

export const resetWebsite = (dispatch, router) => {
  dispatch(setSearchText(""));
  router.replace("/");
  router.push("/");
};
