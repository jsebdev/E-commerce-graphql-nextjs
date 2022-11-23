import { setActivationEmail, setUser } from "store/slices/userSlice";
import { createPath, notifyFormErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { ACCOUNT_CREATED_PATH } from "helpers/strings";
import { SIGN_UP } from "helpers/gqlQueries";

export const useSignup = (dispatch, router, client) => {
  const formSettings = {
    initialValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
    validate: {
      username: (value) => (value.length === 0 ? "Username is missing!" : null),
      email: (value) => (value.length === 0 ? "Email is missing!" : null),
      password1: (value) =>
        value.length === 0 ? "Password is missing!" : null,
      password2: (value) =>
        value.length === 0 ? "Password verification is missing!" : null,
    },
  };
  const handleSignup = async (values) => {
    dispatch(setLoading(true));
    const { data } = await client.mutate({ mutation: SIGN_UP(values) });
    const { success, errors } = data.register;
    let errorMessages = [];
    if (success) {
      dispatch(setActivationEmail(values.email));
      router.push(createPath(ACCOUNT_CREATED_PATH));
    } else {
      errorMessages = Object.keys(errors).map((key) => errors[key][0].message);
    }
    dispatch(setLoading(false));
    return { success, errorMessages };
  };
  return { handleSignup, formSettings, handleFormErrors: notifyFormErrors };
};

export const handleLogout = (dispatch, router) => {
  dispatch(setLoading(true));
  dispatch(setUser({ token: null, username: null, email: null }));
  router.push("/");
  dispatch(setLoading(false));
};
