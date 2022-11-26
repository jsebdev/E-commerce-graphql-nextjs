import { Alert } from "@mantine/core";
import Image from "next/image";
import React from "react";

export const AlertOwl = ({ children, color = "green", title = "" }) => {
  return (
    <Alert
      icon={
        <Image src="/images/owl_64.png" width={35} height={35} alt="advice" />
      }
      title={title}
      color={color}
      styles={{
        icon: {
          width: "30px",
        },
      }}
    >
      {children}
    </Alert>
  );
};
