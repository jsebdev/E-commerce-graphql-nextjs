import styles from "styles/global.scss";
import { wrapper } from "store/store";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";
import { THEMES } from "helpers/strings";
import { darkTheme, lightTheme } from "helpers/themes";
import { useEffect } from "react";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [colorScheme, setColorScheme] = useState(THEMES.light);
  const [theme, setTheme] = useState(lightTheme);
  const toggleColorScheme = (value) =>
    setColorScheme(
      value || (colorScheme === THEMES.dark ? THEMES.light : THEMES.dark)
    );
  useEffect(() => {
    if (colorScheme == THEMES.dark) {
      setTheme(darkTheme);
      return;
    }
    setTheme(lightTheme);
  }, [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <Provider store={store}>
          <Component {...props.pageProps} />
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
