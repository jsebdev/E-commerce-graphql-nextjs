import { setItems, setSearchText } from "store/slices/searchSlice";

export const resetWebsite = (dispatch, router) => {
  dispatch(setSearchText(""));
  dispatch(setItems([]));
  router.replace("/");
  router.push("/");
};
