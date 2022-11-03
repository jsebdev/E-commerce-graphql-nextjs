import { setUser } from "store/slices/userSlice";
import { handleFormErrors } from "helpers/utils";
import { gql } from "@apollo/client";
import { client } from "apolloClient";
import { setLoading } from "store/slices/loaderSlice";
import { PROFILE_PATH } from "helpers/strings";

export const useSignup = (dispatch, router) => {
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
    const mutation = gql`
      mutation {
        register (email:"${values.email}",
                  username:"${values.username}",
                  password1: "${values.password1}",
                  password2:"${values.password2}") {
          success
          errors
          refreshToken
          token
        }
      }
    `;
    const { data } = await client.mutate({ mutation });
    // debugger;
    const { success, errors, refreshToken, token } = data.register;
    let errorMessages = [];
    if (success) {
      // dispatch(setUser({ token, username: user.username }));
      router.push(PROFILE_PATH);
    } else {
      errorMessages = Object.keys(errors).map((key) => errors[key][0].message);
    }
    dispatch(setLoading(false));
    return { success, errorMessages };
  };
  return { handleSignup, formSettings, handleFormErrors };
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
