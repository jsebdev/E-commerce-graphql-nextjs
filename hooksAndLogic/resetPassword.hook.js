import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { RESET_PASSWORD_MUTATION } from "helpers/gqlQueries";
import { useState } from "react";

export const useResetPassword = ({ token }) => {
  const [errors, setErrors] = useState([]);
  const formSettings = {
    initialValues: {
      password1: "",
      password2: "",
    },
    validate: {
      password1: (value) =>
        value.length === 0 ? "New Password is missing!" : null,
      password2: (value) =>
        value.length === 0 ? "Please type the new password again" : null,
    },
  };
  const form = useForm(formSettings);

  const [resetPassword, { data, loading }] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onError: (error) => {
        console.log("error in reset password mutation", error);
      },
    }
  );

  const handleResetPassword = async (values) => {
    const { password1, password2 } = values;
    const {
      data: { passwordReset },
    } = await resetPassword({
      variables: {
        password1,
        password2,
        token,
      },
    });
    if (!passwordReset.success) {
      setErrors(
        Object.values(passwordReset.errors).reduce(
          (prev, act) => [...prev, ...act.map((err) => err.message)],
          []
        )
      );
    }
    return passwordReset;
  };

  return {
    form,
    handleResetPassword,
    loading,
    errors,
    success: data?.passwordReset?.success,
    setErrors,
  };
};
