"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import DataProvider from "@/app/provider";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

const QueryURL: string =
  "https://api.studio.thegraph.com/query/46447/solarcraft-database/version/latest";

const client = new Client({
  url: QueryURL,
  exchanges: [cacheExchange, fetchExchange],
});

export default function ProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      clientId="5dde29d76fbf70687fe113c9743275df"
      activeChain={Sepolia}
    >
      <Provider value={client}>
        <DataProvider>{children}</DataProvider>
      </Provider>
    </ThirdwebProvider>
  );
}
