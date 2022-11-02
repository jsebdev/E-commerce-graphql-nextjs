import React from "react";
import { Center } from "@mantine/core";
import { hoverButtonEffect } from "./componentHelpers/hoverButton";

export const HeaderButton = ({ children, className }) => {
  return (
    <Center
      className={className}
      p="0.3rem"
      sx={(theme) => ({ ...hoverButtonEffect(theme) })}
    >
      {children}
    </Center>
  );
};
