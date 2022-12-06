import { Button } from "@mantine/core";
import React from "react";

export const InlineButton = ({ children }) => {
  return (
    <Button
      p={0}
      variant="subtle"
      styles={{
        root: {
          height: "auto",
          fontSize: "0.95em",
        },
      }}
    >
      {children}
    </Button>
  );
};
