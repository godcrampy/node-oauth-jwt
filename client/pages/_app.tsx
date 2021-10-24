import { BaseProvider, LightTheme } from "baseui";
import { AppProps } from "next/dist/shared/lib/router/router";
import { Provider as StyletronProvider } from "styletron-react";
import { debug, styletron } from "../styletron";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
};

export default MyApp;
