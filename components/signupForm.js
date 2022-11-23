import { Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignup } from "hooksAndLogic/signup.hook";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";
import { useApolloClient } from "@apollo/client";

export const SignUpForm = ({ displayErrors }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const client = useApolloClient();
  const { handleSignup, formSettings, handleFormErrors } = useSignup(
    dispatch,
    router,
    client
  );
  const form = useForm(formSettings);
  const signUp = async (values) => {
    const { success, errorMessages } = await handleSignup(values);
    if (!success) {
      displayErrors(errorMessages);
    }
  };
  return (
    <>
      <h3>Sign Up</h3>
      <Box my="lg">
        <Text>Welcome to this platform</Text>
        <Text>
          In order to create your account your emails will be requested.
        </Text>
        <Text>but don&apos;t worry!</Text>
        <Text>
          This project is intended only as a demonstration. I&apos;m not saving
          your info anywhere for commercial purposes ;)
        </Text>
      </Box>
      <form onSubmit={form.onSubmit(signUp, handleFormErrors)}>
        <TextInput
          id="username"
          placeholder="username"
          label="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          id="email"
          placeholder="email"
          label="Email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          id="password1"
          placeholder="password"
          label="Password"
          {...form.getInputProps("password1")}
        />
        <PasswordInput
          id="password2"
          placeholder="password"
          label="Repeat password"
          {...form.getInputProps("password2")}
        />
        <Button type="submit" mt="lg">
          Sign in
        </Button>
      </form>
    </>
  );
};
