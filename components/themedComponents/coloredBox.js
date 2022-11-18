import { Box } from "@mantine/core";
import React from "react";
import cn from "classnames";
import shadedBoxStyles from "styles/componentsStyles/coloredBox.module.scss";
import { shadedBackground } from "helpers/utils";

const ColoredBox = ({ children, wide, className }) => {
  return (
    <Box
      className={cn({
        [shadedBoxStyles.wide]: wide,
        [shadedBoxStyles.notWide]: !wide,
        [shadedBoxStyles.coloredBox]: true,
        [className]: className,
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

export default ColoredBox;
