import React from "react";
import { Center } from "@mantine/core";
import { hoverButtonEffect } from "./componentHelpers/hoverButtonEffect";

export const HeaderButton = ({ children, className }) => {
  return (
    <Center
      className={className}
      p="0.3rem"
      m="0.5rem"
      sx={(theme) => ({ ...hoverButtonEffect(theme) })}
    >
      {children}
    </Center>
  );
};
