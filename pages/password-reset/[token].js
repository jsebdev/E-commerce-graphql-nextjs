import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { AlertOwl } from "components/alertOwl";
import { ErrorMessages } from "components/errorMessages";
import { Layout } from "components/layout";
import { LOGIN_PATH } from "helpers/strings";
import { createPath, notifyFormErrors } from "helpers/utils";
import { useResetPassword } from "hooksAndLogic/resetPassword.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PasswordReset = () => {
  const router = useRouter();
  const { token } = router.query;
  const { form, handleResetPassword, errors, setErrors, success } =
    useResetPassword({
      token,
    });

  const submit = (event) => {
    setErrors([]);
    form.onSubmit(handleResetPassword, notifyFormErrors)(event);
  };

  return (
    <Layout>
      <Container size="sm">
        <Stack>
          <Title order={2}>Reset password</Title>
          {success === true ? (
            <>
              <AlertOwl title="Good job">
                Your password has been updated
              </AlertOwl>
              <Link href={createPath(LOGIN_PATH)}>
                <Button>Go to log in</Button>
              </Link>
            </>
          ) : (
            <>
              <Text>Please enter your new password.</Text>
              <form onSubmit={submit}>
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
                  Reset password
                </Button>
              </form>
            </>
          )}
          {success === false && <ErrorMessages errorMessages={errors} />}
        </Stack>
      </Container>
    </Layout>
  );
};

export default PasswordReset;
