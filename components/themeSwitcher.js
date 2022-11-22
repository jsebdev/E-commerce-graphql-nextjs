import React from "react";
import { useMantineColorScheme } from "@mantine/core";
import { THEMES_NAMES } from "helpers/strings";
import Image from "next/image";
import styles from "styles/componentsStyles/header.module.scss";

export const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme.colorScheme === THEMES_NAMES.dark;

  return (
    <div
      onClick={() => toggleColorScheme()}
      className={styles.smallHeaderButton}
    >
      {isDark ? (
        <Image
          // layout="responsive"
          fill
          src="/images/sun_64.png"
          // width={20}
          // height={20}
          alt="sun"
          sizes="25vw"
        />
      ) : (
        <Image
          // layout="responsive"
          fill
          src="/images/moon_64.png"
          // width={20}
          // height={20}
          alt="moon"
          sizes="25vw"
        />
      )}
    </div>
  );
};
