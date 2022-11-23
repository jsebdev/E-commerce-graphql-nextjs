import { useLogin } from "hooksAndLogic/login.hook";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";
import { useApolloClient } from "@apollo/client";

export const LoginForm = ({ displayErrors }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const client = useApolloClient();
  const { handleLogin, formSettings, handleFormErrors } = useLogin(
    dispatch,
    router,
    client
  );
  const form = useForm(formSettings);
  const login = async (values) => {
    const { success, errors } = await handleLogin(values);
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
          id="Username"
          placeholder="username or email"
          label="Username or Email"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          id="Password"
          placeholder="password"
          label="password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" mt="lg">
          Log In
        </Button>
      </form>
    </>
  );
};
