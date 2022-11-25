import { Button, Stack } from "@mantine/core";
import { CREDITS_PATH } from "helpers/strings";
import { createPath } from "helpers/utils";
import Link from "next/link";
import React from "react";
import footerStyles from "styles/componentsStyles/footer.module.scss";

export const Footer = () => {
  return (
    <Stack className={footerStyles.footer}>
      <Link href={createPath(CREDITS_PATH)}>
        <Button variant="white">Free content attributes</Button>
      </Link>
    </Stack>
  );
};
