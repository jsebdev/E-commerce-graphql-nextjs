import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import { SEND_RESET_PASSWORD_EMAIL } from "helpers/gqlQueries";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "store/slices/loaderSlice";

export const useSendResetPasswordEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const formSettings = {
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (value.length === 0 ? "Please provide an email" : null),
    },
  };
  const form = useForm(formSettings);

  const [sendEmail, { data, loading }] = useMutation(
    SEND_RESET_PASSWORD_EMAIL,
    {
      onError: (error) => {
        console.log("error in send reset password email mutation", error);
      },
    }
  );
  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  const handleSendEmail = async ({ email }) => {
    const {
      data: { sendPasswordResetEmail },
    } = await sendEmail({
      variables: {
        email,
      },
    });
    if (sendPasswordResetEmail.success) {
      setEmail(email);
    } else {
      setErrors(
        Object.values(sendPasswordResetEmail.errors).reduce(
          (prev, act) => [...prev, ...act.map((err) => err.message)],
          []
        )
      );
    }
    return sendPasswordResetEmail;
  };

  return {
    form,
    handleSendEmail,
    loading,
    errors,
    success: data?.sendPasswordResetEmail?.success,
    email,
  };
};
