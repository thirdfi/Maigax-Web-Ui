import { ReactNode, useEffect, useState, createContext, useContext } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

interface Web3ContextType {
  address: string | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
});

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const { isConnected, address } = useAccount();       
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { open } = useAppKit();                           

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const connect = () => {
    open();
  };

  const disconnect = () => {
    wagmiDisconnect();
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address: address ?? null,
        connect,
        disconnect,
      }}
    >
      {mounted ? children : null}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
