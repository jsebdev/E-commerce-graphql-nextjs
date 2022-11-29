import { THEMES_NAMES } from "./strings";

const fontOptions = {
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Poppins, monospace",
  headings: { fontFamily: "Poppins, sans-serif" },
};

export const lightTheme = {
  colorScheme: THEMES_NAMES.light,
  colors: {
    superColor: [
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
      "#00ffff",
    ],
  },
  ...fontOptions,
};

export const darkTheme = {
  colorScheme: THEMES_NAMES.dark,
  colors: {
    superColor: [
      "#ff0000",
      "#ff0000",
      "#ff00ff",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
      "#ff0000",
    ],
  },
  ...fontOptions,
};
