import { useLogin } from "hooksAndLogic/login.hook";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";
import { useApolloClient } from "@apollo/client";
import { createPath } from "helpers/utils";
import { SEND_RESET_PASSWORD_EMAIL_PATH } from "helpers/strings";
import Link from "next/link";

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
        <Stack spacing={10}>
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
          <div>
            <Button type="submit">Log In</Button>
          </div>
          <Link
            href={createPath(SEND_RESET_PASSWORD_EMAIL_PATH)}
            className="normalColor classic"
          >
            forgot password?
          </Link>
        </Stack>
      </form>
    </>
  );
};
