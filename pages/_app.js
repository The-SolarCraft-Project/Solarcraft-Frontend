import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import DataProvider from "../context/DataProvider";
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={Sepolia}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ThirdwebProvider>
  );
}
