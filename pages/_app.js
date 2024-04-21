import React, { Children, useEffect } from "react";
import "../styles/globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { useConnectWallet } from "../lib/contract";

// @ts-ignore
function App({ children }) {
  const { connectWallet } = useConnectWallet();

  useEffect(connectWallet, []);

  return <>{children}</>;
}

// @ts-ignore
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider>
      <App>
        <Component {...pageProps} />
      </App>
    </ThirdwebProvider>
  );
}

export default MyApp;
