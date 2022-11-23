import { showNotification } from "@mantine/notifications";
import { UPDATE_ACCOUNT } from "helpers/gqlQueries";
import { notifyErrors } from "helpers/utils";
import { setLoading } from "store/slices/loaderSlice";

export const useEditEmail = (dispatch, user, client, setErrors, onClose) => {
  const formSettings = {
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (value.length === 0 ? "Email is missing!" : null),
    },
  };
  const editEmail = async (values, form) => {
    dispatch(setLoading(true));
    const {
      data: {
        updateAccount: { success, errors },
      },
    } = await client.mutate({
      mutation: UPDATE_ACCOUNT(values.email, user.username),
    });
    dispatch(setLoading(false));
    if (success) {
      showNotification({
        title: "Email updated!",
        message: "Your email has been updated successfully!",
        color: "teal",
      });
      setErrors([]);
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
  return { editEmail, formSettings };
};
