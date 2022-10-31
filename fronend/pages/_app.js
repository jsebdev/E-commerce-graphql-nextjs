import { wrapper } from "store/store";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useState } from "react";
import { THEMES, THEME_COOKIE } from "helpers/strings";
import { darkTheme, lightTheme } from "helpers/themes";
import { useEffect } from "react";
import cookies from "next-cookies";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [colorScheme, setColorScheme] = useState(props.colorScheme);
  const [theme, setTheme] = useState(null);
  const toggleColorScheme = (value) => {
    const nextColorScheme =
      value || (colorScheme === THEMES.dark ? THEMES.light : THEMES.dark);
    setColorScheme(nextColorScheme);
    document.cookie = `${THEME_COOKIE}=${nextColorScheme}; path=/`;
  };
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

App.getInitialProps = ({ ctx }) => ({
  colorScheme: cookies(ctx)[THEME_COOKIE] || THEMES.light,
});
