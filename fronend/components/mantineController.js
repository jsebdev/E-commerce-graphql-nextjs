import { THEMES_NAMES } from "helpers/strings";
import { darkTheme, lightTheme } from "helpers/themes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeName, toggleTheme } from "store/slices/themeSlice";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

export const MantineController = ({ children }) => {
  const dispatch = useDispatch();
  const themeName = useSelector(selectThemeName);
  const [theme, setTheme] = useState(null);
  const toggleColorScheme = (value) => dispatch(toggleTheme(value));

  useEffect(() => {
    if (themeName == THEMES_NAMES.dark) {
      setTheme(darkTheme);
      return;
    }
    setTheme(lightTheme);
  }, [themeName]);

  return (
    <ColorSchemeProvider
      colorScheme={{ colorScheme: themeName }}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
