import { useState } from "react";
import {
  Wallet,
  ChevronDown,
  ArrowRightLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useAccount,
  useDisconnect,
} from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WalletModal from "./WalletModal";

interface WalletConnectButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

const WalletConnectButton = ({
  className,
  variant = "default",
  size = "default",
  onClick,
}: WalletConnectButtonProps) => {
  const { open } = useAppKit(); // Real wallet connect
  const { isConnected, address } = useAccount(); // wagmi
  const { disconnect } = useDisconnect();

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [modalActiveTab, setModalActiveTab] = useState<"wallet" | "transaction">("wallet");

  const formatAddress = (addr: string) => {
    return addr.substring(0, 6) + "..." + addr.substring(addr.length - 4);
  };

  const handleConnect = () => {
    open(); // open reown modal
    if (onClick) onClick();
  };

  const handleDisconnect = () => {
    disconnect();
    if (onClick) onClick();
  };

  const handleOpenWalletModal = (tab: "wallet" | "transaction") => {
    setModalActiveTab(tab);
    setIsWalletModalOpen(true);
  };

  if (!isConnected || !address) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={handleConnect}
        className={className}
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className={cn(
              "relative group",
              "bg-green-950 border-green-700 hover:bg-green-900 text-white",
              className
            )}
          >
            <span className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-300 animate-pulse-light"></span>
              {formatAddress(address)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-maiga-primary border-maiga-secondary-dark"
        >
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => handleOpenWalletModal("wallet")}
          >
            <Wallet className="mr-2 h-4 w-4" />
            <span>Wallet</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer"
            onClick={() => handleOpenWalletModal("transaction")}
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            <span>Transaction</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center text-red-400 cursor-pointer focus:text-red-400 hover:text-red-300"
            onClick={handleDisconnect}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        defaultTab={modalActiveTab}
      />
    </>
  );
};

export default WalletConnectButton;
