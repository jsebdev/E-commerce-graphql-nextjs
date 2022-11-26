import {
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { AlertOwl } from "components/alertOwl";
import { ErrorMessages } from "components/errorMessages";
import { Layout } from "components/layout";
import { notifyFormErrors } from "helpers/utils";
import { useSendResetPasswordEmail } from "hooksAndLogic/sendResetPasswordEmail.hook";
import React from "react";

const SendResetPasswordEmail = () => {
  const { form, handleSendEmail, success, email, errors } =
    useSendResetPasswordEmail();

  return (
    <Layout>
      <Container size="xs">
        <Stack>
          <Title order={2}>Send password reset email</Title>
          <form onSubmit={form.onSubmit(handleSendEmail, notifyFormErrors)}>
            <TextInput
              id="email"
              placeholder="email"
              label="Email"
              {...form.getInputProps("email")}
            />
            <Button type="submit" mt="lg">
              Send reset email
            </Button>
          </form>
          {success && (
            <AlertOwl title="Good news">
              <Text>
                If {email} is a correct user&apos;s email. A reset email should
                have been sent to it.
              </Text>
            </AlertOwl>
          )}
          {success === false && <ErrorMessages errorMessages={errors} />}
        </Stack>
      </Container>
    </Layout>
  );
};

export default SendResetPasswordEmail;
