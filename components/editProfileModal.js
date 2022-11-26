import { Button, Modal, Space, Stack, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { selectEmail, selectUsername } from "store/slices/userSlice";
import { EditEmailModal } from "./editEmailModal";
import { EditPasswordModal } from "./editPasswordModal";
import { EditUsernameModal } from "./editUsernameModal";

export const EditProfileModal = connect((state) => ({
  username: selectUsername(state),
  email: selectEmail(state),
}))(({ showModal, setShowModal, username, email }) => {
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };
  const showSecondModal = (setSecondModal) => () => {
    setShowModal(false);
    setSecondModal(true);
  };
  const closeSecondModal = (setSecondModal) => () => {
    setSecondModal(false);
    setShowModal(true);
  };
  return (
    <>
      <Modal
        opened={showModal}
        onClose={onClose}
        withCloseButton={false}
        centered
      >
        <Stack align="center">
          <Stack align="flex-start" spacing={2}>
            <Title order={3} align="center">
              Edit profile
            </Title>
            <Space h="md" />
            <Text>Username: {username}</Text>
            <Button onClick={showSecondModal(setShowUsernameModal)}>
              Edit
            </Button>
            <Space h="md" />
            <Text>Password: *********</Text>
            <Button onClick={showSecondModal(setShowPasswordModal)}>
              Edit
            </Button>
            <Space h="md" />
            <Text>Email: {email}</Text>
            <Button onClick={showSecondModal(setShowEmailModal)}>Edit</Button>
          </Stack>
        </Stack>
      </Modal>
      <EditUsernameModal
        showUsernameModal={showUsernameModal}
        onClose={closeSecondModal(setShowUsernameModal)}
      />
      <EditPasswordModal
        showUsernameModal={showPasswordModal}
        onClose={closeSecondModal(setShowPasswordModal)}
      />
      <EditEmailModal
        showUsernameModal={showEmailModal}
        onClose={closeSecondModal(setShowEmailModal)}
      />
    </>
  );
});
