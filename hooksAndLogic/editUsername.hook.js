import { showNotification } from "@mantine/notifications";
import { UPDATE_ACCOUNT } from "helpers/gqlQueries";
import { notifyErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { handleLogout } from "./signup.hook";

export const useEditUsername = (dispatch, user, client, router, setErrors) => {
  const formSettings = {
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) => (value.length === 0 ? "Username is missing!" : null),
    },
  };
  const editUsername = async (values) => {
    dispatch(setLoading(true));
    const {
      data: {
        updateAccount: { success, errors },
      },
    } = await client.mutate({
      mutation: UPDATE_ACCOUNT(user.email, values.username),
    });
    dispatch(setLoading(false));
    if (success) {
      showNotification({
        title: "Username updated!",
        message: "Your username has been updated successfully!",
        color: "teal",
      });
      handleLogout(dispatch, router);
      setErrors([]);
    }
    if (errors) {
      const errorMessages = Object.values(errors).reduce(
        (prev, curr) => [...prev, ...curr.map((error) => error.message)],
        []
      );
      notifyErrors(errorMessages);
      setErrors(errorMessages);
    }
  };
  return { editUsername, formSettings };
};
