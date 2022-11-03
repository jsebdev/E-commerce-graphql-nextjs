import { setUser } from "store/slices/userSlice";
import { handleFormErrors } from "helpers/utils";
import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const useSignup = (dispatch, router) => {
  const formSettings = {
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (value.length === 0 ? "Username is missing!" : null),
      password: (value) => (value.length === 0 ? "Password is missing!" : null),
    },
  };
  const handleLogin = async (values) => {
    dispatch(setLoading(true));
    const mutation = gql`
      mutation {
        tokenAuth(username: "${values.username}", password: "${values.password}") {
          token
          success
          errors
          user {
            username
          }
          unarchiving
          refreshToken
        }
      }
    `;
    const { data } = await client.mutate({ mutation });
    const { success, errors, user, token } = data.tokenAuth;
    if (success) {
      dispatch(setUser({ token, username: user.username }));
      router.push("/profile");
    }
    dispatch(setLoading(false));
    return { success, errors };
  };
  return { handleLogin, formSettings, handleFormErrors };
};

export const useLogout = (dispatch, router) => {
  const handleLogout = () => {
    dispatch(setLoading(true));
    dispatch(setUser({ token: null, username: null }));
    router.push("/");
    dispatch(setLoading(false));
  };
  return { handleLogout };
};
