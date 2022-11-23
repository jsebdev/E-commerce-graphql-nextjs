import { useApolloClient } from "@apollo/client";
import { Button, Modal, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifyFormErrors } from "helpers/utils";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEditPassword } from "hooksAndLogic/editPassword.hook";
import { ErrorMessages } from "./errorMessages";

export const EditPasswordModal = ({ showUsernameModal, onClose }) => {
  const dispatch = useDispatch();
  const client = useApolloClient();
  const [errors, setErrors] = useState([]);
  const { editPassword, formSettings } = useEditPassword(
    dispatch,
    client,
    setErrors,
    onClose
  );
  const form = useForm(formSettings);
  return (
    <Modal
      opened={showUsernameModal}
      onClose={onClose}
      withCloseButton={false}
      centered
    >
      <form
        onSubmit={form.onSubmit(
          (values) => editPassword(values, form),
          notifyFormErrors
        )}
      >
        <Stack spacing="md">
          <PasswordInput
            id="oldPassword"
            placeholder="Old password"
            label="Old password"
            {...form.getInputProps("oldPassword")}
          />
          <PasswordInput
            id="newPassword1"
            placeholder="New password"
            label="New password"
            {...form.getInputProps("newPassword1")}
          />
          <PasswordInput
            id="newPassword2"
            placeholder="Repeat new password"
            label="Repeat new password"
            {...form.getInputProps("newPassword2")}
          />
          <Stack align="center">
            <Button type="submit">Save</Button>
          </Stack>
          <ErrorMessages errorMessages={errors}></ErrorMessages>
        </Stack>
      </form>
    </Modal>
  );
};
