// import '@web3modal/polyfills' // ✅ 保留这句

// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// import { createWeb3Modal } from '@web3modal/wagmi/react'
// import { wagmiConfig, projectId } from './lib/wallet'
// import { WagmiProvider } from 'wagmi'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// createWeb3Modal({
//   wagmiConfig,
//   projectId
// })

// const queryClient = new QueryClient()

// createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <WagmiProvider config={wagmiConfig}>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </WagmiProvider>
//   </React.StrictMode>
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter, queryClient } from './lib/wallet';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
