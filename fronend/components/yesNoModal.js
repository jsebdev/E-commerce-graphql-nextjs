import { Button, Group, Modal, Stack } from "@mantine/core";
import React from "react";
// import yesNoModalStyles from "styles/componentsStyles/yesNoModal.module.scss";

/**
 *  children must be a p tag with the text to be displayed
 */
export const YesNoModal = ({ opened, children, onYes, onNot }) => {
  return (
    <Modal opened={opened} withCloseButton={false} centered onClose={onNot}>
      <Stack align="center" spacing="md">
        {children}
        <Group>
          <Button onClick={onNot}>No</Button>
          <Button color="red" onClick={onYes}>
            Yes
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};
