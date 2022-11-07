import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignup } from "hooksAndLogic/signup.hook";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React from "react";

export const SignUpForm = ({ displayErrors }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { handleSignup, formSettings, handleFormErrors } = useSignup(
    dispatch,
    router
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
      <Text>Welcome to this platform</Text>
      <Text>
        In order to create your account your emails will be requested.
      </Text>
      <Text>but don&apos;t worry!</Text>
      <Text>
        This project is intended only as a demonstration. I&apos;m not saving
        your info anywhere for commercial purposes ;)
      </Text>
      <form onSubmit={form.onSubmit(signUp, handleFormErrors)}>
        <TextInput
          id="username"
          placeholder="username"
          label="username"
          {...form.getInputProps("username")}
        />
        <TextInput
          id="email"
          placeholder="email"
          label="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          id="password1"
          placeholder="password1"
          label="password1"
          {...form.getInputProps("password1")}
        />
        <PasswordInput
          id="password2"
          placeholder="password2"
          label="password2"
          {...form.getInputProps("password2")}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </>
  );
};