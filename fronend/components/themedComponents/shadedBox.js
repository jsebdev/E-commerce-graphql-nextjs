import { Box } from "@mantine/core";
import React from "react";
import cn from "classnames";
import shadedBoxStyles from "styles/componentsStyles/shadedBox.module.scss";

// export const ShadedBox = forwardRef(({ children }, ref) => {

const shadeBoxBackground = (theme) =>
  theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1];

export const ShadedBox = ({ children, wide }) => {
  return (
    <Box
      className={cn({
        [shadedBoxStyles.wide]: wide,
        [shadedBoxStyles.shadedBox]: true,
      })}
      sx={(theme) => ({
        backgroundColor: shadeBoxBackground(theme),
        "&:before": {
          backgroundColor: shadeBoxBackground(theme),
        },
        "&:after": {
          backgroundColor: shadeBoxBackground(theme),
        },
      })}
    >
      {children}
    </Box>
  );
};
