import { useApolloClient } from "@apollo/client";
import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifyFormErrors } from "helpers/utils";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { selectUser } from "store/slices/userSlice";
import { ErrorMessages } from "./errorMessages";
import { useEditEmail } from "hooksAndLogic/editEmail.hook";

export const EditEmailModal = connect((state) => ({
  user: selectUser(state),
}))(({ showUsernameModal, onClose, user }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const client = useApolloClient();
  const { editEmail, formSettings } = useEditEmail(
    dispatch,
    user,
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
          (values) => editEmail(values, form),
          notifyFormErrors
        )}
      >
        <Stack spacing="md">
          <TextInput
            id="email"
            placeholder="New Email"
            label="New email"
            {...form.getInputProps("email")}
          />
          <Stack align="center">
            <Button type="submit">Save</Button>
          </Stack>
          <ErrorMessages errorMessages={errors}></ErrorMessages>
        </Stack>
      </form>
    </Modal>
  );
});
