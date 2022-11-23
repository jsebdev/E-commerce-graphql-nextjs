import { useApolloClient } from "@apollo/client";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifyFormErrors } from "helpers/utils";
import { useEditUsername } from "hooksAndLogic/editUsername.hook";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { selectUser } from "store/slices/userSlice";
import { IconAlertCircle } from "@tabler/icons";
import { useRouter } from "next/router";
import { ErrorMessages } from "./errorMessages";

export const EditUsernameModal = connect((state) => ({
  user: selectUser(state),
}))(({ showUsernameModal, onClose, user }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const client = useApolloClient();
  const router = useRouter();
  const { editUsername, formSettings } = useEditUsername(
    dispatch,
    user,
    client,
    router,
    setErrors
  );
  const form = useForm(formSettings);
  return (
    <Modal
      opened={showUsernameModal}
      onClose={onClose}
      withCloseButton={false}
      centered
    >
      <form onSubmit={form.onSubmit(editUsername, notifyFormErrors)}>
        <Stack spacing="md">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Atention!"
            color="yellow"
          >
            After changing your username, you will be logged out.
          </Alert>
          <TextInput
            id="Username"
            placeholder="New username"
            label="new username"
            {...form.getInputProps("username")}
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
