import { THEMES_NAMES } from "helpers/strings";

export const hoverButtonEffect = (theme) => ({
  transition: "background-color 0.2s ease",
  borderRadius: "0.3rem",
  "&:hover": {
    backgroundColor:
      theme.colorScheme === THEMES_NAMES.light
        ? theme.colors.gray[2]
        : theme.colors.gray[7],
  },
});
