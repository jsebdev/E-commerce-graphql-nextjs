import { setUser } from "store/slices/userSlice";
import { createPath, notifyFormErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { PROFILE_PATH } from "helpers/strings";
import { LOGIN_WITH_EMAIL, LOGIN_WITH_USERNAME } from "helpers/gqlQueries";

export const useLogin = (dispatch, router, client) => {
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
  const handleLogin = (values) => {
    dispatch(setLoading(true));
    return new Promise((resolve, reject) => {
      const loginUsername = client.mutate({
        mutation: LOGIN_WITH_USERNAME(values),
      });
      const loginEmail = client.mutate({
        mutation: LOGIN_WITH_EMAIL(values),
      });
      Promise.all([loginUsername, loginEmail])
        .then((results) => {
          const {
            data: {
              tokenAuth: { success, errors, user, token },
            },
          } = results.reduce((prev, curr) => {
            if (curr.data.tokenAuth.success) return curr;
            return prev;
          });
          if (success) {
            dispatch(
              setUser({ token, username: user.username, email: user.email })
            );
            router.push(createPath(PROFILE_PATH));
          }
          dispatch(setLoading(false));
          resolve({ success, errors });
        })
        .catch((error) => {
          dispatch(setLoading(false));
          reject(error);
        });
    });
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
