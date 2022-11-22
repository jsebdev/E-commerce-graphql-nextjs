import { setUser } from "store/slices/userSlice";
import { createPath, notifyFormErrors } from "helpers/utils";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";
import { PROFILE_PATH } from "helpers/strings";
import { LOGIN } from "helpers/gqlQueries";

export const useLogin = (dispatch, router) => {
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
    const { data } = await client.mutate({ mutation: LOGIN(values) });
    const { success, errors, user, token } = data.tokenAuth;
    if (success) {
      dispatch(setUser({ token, username: user.username }));
      router.push(createPath(PROFILE_PATH));
    }
    dispatch(setLoading(false));
    return { success, errors };
  };
  return { handleLogin, formSettings, handleFormErrors: notifyFormErrors };
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