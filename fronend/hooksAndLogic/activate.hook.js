import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const useActivateAccount = (dispatch) => {
  const activateAccount = async (token) => {
    dispatch(setLoading(true));
    const mutation = gql`
    mutation {
      verifyAccount(token: "${token}") {
        success
        errors
      }
    }
  `;
    let retSuccess, retErrors;
    try {
      const {
        data: {
          verifyAccount: { success, errors },
        },
      } = await client.mutate({ mutation });
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
