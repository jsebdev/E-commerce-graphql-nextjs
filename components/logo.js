import React from "react";
import { resetWebsite } from "helpers/uiHelpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import logoStyles from "styles/componentsStyles/logo.module.scss";
import { ActionIcon } from "@mantine/core";

export const Logo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <ActionIcon
      className={logoStyles.logoContainer}
      onClick={() => resetWebsite(dispatch, router)}
    >
      <Image src="/images/store_128.png" width="100%" height="100%" />
    </ActionIcon>
  );
};
