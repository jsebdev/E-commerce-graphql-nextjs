import { Alert, Box } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import React from "react";

export const ErrorMessages = ({ errorMessages }) => {
  return (
    <>
      {errorMessages.length > 0 && (
        <Box>
          {errorMessages.map((message) => (
            <Alert
              my="sm"
              icon={<IconAlertCircle size={16} />}
              title="Don't panic but..."
              color="red"
              key={message}
            >
              {message}
            </Alert>
          ))}
        </Box>
      )}
    </>
  );
};
