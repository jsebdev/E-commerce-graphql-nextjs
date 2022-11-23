import { showNotification } from "@mantine/notifications";
import { CHANGE_PASSWORD } from "helpers/gqlQueries";
import { notifyErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";
import { setToken } from "store/slices/userSlice";

export const useEditPassword = (dispatch, client, setErrors, onClose) => {
  const formSettings = {
    initialValues: {
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
    },
    validate: {
      oldPassword: (value) =>
        value.length === 0 ? "Please provide the old password" : null,
      newPassword1: (value) =>
        value.length === 0 ? "Please provide the new password" : null,
      newPassword2: (value) =>
        value.length === 0 ? "Please repeat the new password" : null,
    },
  };
  const editPassword = async (values, form) => {
    dispatch(setLoading(true));
    const {
      data: {
        passwordChange: { success, errors, token },
      },
    } = await client.mutate({
      mutation: CHANGE_PASSWORD(
        values.oldPassword,
        values.newPassword1,
        values.newPassword2
      ),
    });
    dispatch(setLoading(false));
    if (success) {
      showNotification({
        title: "Password updated!",
        message: "Your password has been updated successfully!",
        color: "teal",
      });
      setErrors([]);
      dispatch(setToken(token));
      form.reset();
      onClose();
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
  return { editPassword, formSettings };
};
