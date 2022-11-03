import { useLogin } from "hooksAndLogic/login.hook";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";

export const LoginForm = ({ displayErrors }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleLogin, formSettings, handleFormErrors } = useLogin(
    dispatch,
    router
  );
  const form = useForm(formSettings);
  const login = async (e) => {
    const { success, errors } = await handleLogin(e);
    if (!success) {
      const errorMessages = errors?.nonFieldErrors?.map(
        (error) => error.message
      );
      displayErrors(errorMessages);
    }
  };

  return (
    <>
      <h3>Log in</h3>
      <form onSubmit={form.onSubmit(login, handleFormErrors)}>
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
