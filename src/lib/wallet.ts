import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { bsc } from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";

const projectId = import.meta.env.VITE_PUBLIC_PROJECT_WALLET_ID;

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [bsc],
  ssr: false,
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [bsc],
  metadata: {
    name: "MaigaXBT",
    description: "MaigaXBT",
    url: "http://localhost:8080",
    icons: [],
  },
});

const queryClient = new QueryClient();

export { wagmiAdapter, queryClient };
