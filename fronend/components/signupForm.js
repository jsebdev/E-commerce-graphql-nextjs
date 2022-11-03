import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignup } from "hooksAndLogic/signup.hook";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";

export const SignUpForm = ({ setErrorMessages }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleSignup, formSettings, handleFormErrors } = useSignup(
    dispatch,
    router
  );
  const form = useForm(formSettings);
  const signUp = async (values) => {
    const { success, errors } = await handleSignup(values);
    if (!success) {
      setErrorMessages(errors?.nonFieldErrors?.map((error) => error.message));
    }
  };
  return (
    <>
      <h3>Log in</h3>
      <form onSubmit={form.onSubmit(signUp, handleFormErrors)}>
        <TextInput
          id="username"
          placeholder="username"
          label="username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          id="password"
          placeholder="password"
          label="password"
          {...form.getInputProps("password")}
        />
        <Button type="submit">Log In</Button>
      </form>
    </>
  );
};
