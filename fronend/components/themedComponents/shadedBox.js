import { Box } from "@mantine/core";
import React from "react";
import cn from "classnames";
import shadedBoxStyles from "styles/componentsStyles/shadedBox.module.scss";
import { shadedBackground } from "helpers/utils";

const ShadedBox = ({ children, wide }) => {
  return (
    <Box
      className={cn({
        [shadedBoxStyles.wide]: wide,
        [shadedBoxStyles.notWide]: !wide,
        [shadedBoxStyles.shadedBox]: true,
      })}
      sx={(theme) => ({
        backgroundColor: shadedBackground(theme),
        "&:before": {
          backgroundColor: shadedBackground(theme),
        },
        "&:after": {
          backgroundColor: shadedBackground(theme),
        },
      })}
    >
      {children}
    </Box>
  );
};

export default ShadedBox;
