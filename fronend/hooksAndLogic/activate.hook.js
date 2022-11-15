import { client } from "apolloClient";
import { VERIFY_ACCOUNT } from "helpers/gqlQueries";
import { setLoading } from "store/slices/loaderSlice";

export const useActivateAccount = (dispatch) => {
  const activateAccount = async (token) => {
    dispatch(setLoading(true));
    let retSuccess, retErrors;
    try {
      const {
        data: {
          verifyAccount: { success, errors },
        },
      } = await client.mutate({ mutation: VERIFY_ACCOUNT(token) });
      if (errors) {
        retSuccess = success;
        retErrors = errors.nonFieldErrors.map((error) => error.message);
      }
    } catch (e) {
      console.log("Error: ", e);
      retSuccess = false;
      retErrors = [e.message];
    }
    dispatch(setLoading(false));
    return { success: retSuccess, errors: retErrors };
  };
  return { activateAccount };
};
