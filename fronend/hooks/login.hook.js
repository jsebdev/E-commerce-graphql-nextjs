import { setToken, setUsername } from "store/slices/userSlice";
import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";

export const useLogin = (dispatch, router) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const username = e.target.username.value;
    const password = e.target.password.value;
    const mutation = gql`
      mutation {
        tokenAuth(username: "${username}", password: "${password}") {
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
      dispatch(setToken(token));
      dispatch(setUsername(user.username));
      router.push("/profile");
    }
    dispatch(setLoading(false));
    return { success, errors };
  };
  return { handleLogin };
};

export const useLogout = (dispatch, router) => {
  const handleLogout = () => {
    dispatch(setLoading(true));
    dispatch(setToken(null));
    dispatch(setUsername(null));
    router.push("/");
    dispatch(setLoading(false));
  };
  return { handleLogout };
};
