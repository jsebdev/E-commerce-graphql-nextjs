import { Button, Modal, Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import { EditEmailModal } from "./editEmailModal";
import { EditPasswordModal } from "./editPasswordModal";
import { EditUsernameModal } from "./editUsernameModal";

export const EditProfileModal = ({ showModal, setShowModal }) => {
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
          <Stack>
            <Title order={3} align="center">
              Edit profile
            </Title>
            <Button onClick={showSecondModal(setShowUsernameModal)}>
              Edit username
            </Button>
            <Button onClick={showSecondModal(setShowPasswordModal)}>
              Edit password
            </Button>
            <Button onClick={showSecondModal(setShowEmailModal)}>
              Edit email
            </Button>
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
};
