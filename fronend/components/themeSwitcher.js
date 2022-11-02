import React from "react";
import { useMantineColorScheme } from "@mantine/core";
import { THEMES_NAMES } from "helpers/strings";
import Image from "next/image";
import styles from "./header.module.scss";

export const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === THEMES_NAMES.dark;

  return (
    <div
      onClick={() => toggleColorScheme()}
      className={styles.smallHeaderButton}
    >
      {isDark ? (
        <Image
          layout="responsive"
          src="/images/sun_64.png"
          width={20}
          height={20}
        />
      ) : (
        <Image
          layout="responsive"
          src="/images/moon_64.png"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};
