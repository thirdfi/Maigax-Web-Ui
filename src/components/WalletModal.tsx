
import { useState } from 'react'
import { Copy, Check, Wallet, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWeb3 } from './Web3Provider'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'wallet' | 'transaction'
}

const WalletModal = ({ isOpen, onClose, defaultTab = 'wallet' }: WalletModalProps) => {
  const { address, disconnect } = useWeb3();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'wallet' | 'transaction'>(defaultTab);
  const [hasCopied, setHasCopied] = useState(false);

  // Format the wallet address for display
  const formattedAddress = address ? 
    `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : '';
  
  const fullAddress = address || '';

  const handleCopyAddress = async () => {
    if (!address) return;
    
    try {
      await navigator.clipboard.writeText(address);
      setHasCopied(true);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
      
      // Reset copy icon after 2 seconds
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-maiga-primary border-maiga-secondary-dark text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-maiga-highlight">Wallet Details</DialogTitle>
          <DialogDescription className="text-gray-300">
            View your wallet information and transaction history
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'wallet' | 'transaction')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-maiga-secondary-dark/50">
            <TabsTrigger 
              value="wallet"
              className="data-[state=active]:bg-maiga-secondary-medium data-[state=active]:text-white"
            >
              Wallet
            </TabsTrigger>
            <TabsTrigger 
              value="transaction"
              className="data-[state=active]:bg-maiga-secondary-medium data-[state=active]:text-white"
            >
              Transactions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet" className="space-y-4">
            <div className="bg-maiga-secondary-dark/20 p-4 rounded-md border border-maiga-secondary-dark flex items-center justify-between">
              <div className="font-mono text-sm break-all text-gray-200">{fullAddress}</div>
              <Button variant="ghost" size="icon" onClick={handleCopyAddress} disabled={hasCopied} className="text-gray-300 hover:text-white">
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="bg-maiga-secondary-dark/20 p-4 rounded-md border border-maiga-secondary-dark">
              <h3 className="text-sm font-medium mb-2 text-gray-200">Connected Account</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-maiga-accent to-maiga-highlight flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-black" />
                </div>
                <div>
                  <div className="text-base font-medium text-white">{formattedAddress}</div>
                  <div className="text-sm text-gray-300">Connected via WalletConnect</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transaction" className="space-y-4">
            <div className="bg-maiga-secondary-dark/20 p-4 rounded-md border border-maiga-secondary-dark">
              <h3 className="text-base font-medium mb-3 text-white">Recent Transactions</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-maiga-secondary-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <ArrowRightLeft className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-base font-medium text-white">Claimed 1,250 oMAIGA</div>
                      <div className="text-sm text-gray-300">2 days ago</div>
                    </div>
                  </div>
                  <div className="text-sm bg-green-900/30 text-green-400 px-3 py-1 rounded-full font-medium">Completed</div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-maiga-secondary-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <ArrowRightLeft className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-base font-medium text-white">Redeemed 500 oMAIGA</div>
                      <div className="text-sm text-gray-300">5 days ago</div>
                    </div>
                  </div>
                  <div className="text-sm bg-green-900/30 text-green-400 px-3 py-1 rounded-full font-medium">Completed</div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <ArrowRightLeft className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-base font-medium text-white">Connect Wallet</div>
                      <div className="text-sm text-gray-300">1 week ago</div>
                    </div>
                  </div>
                  <div className="text-sm bg-green-900/30 text-green-400 px-3 py-1 rounded-full font-medium">Completed</div>
                </div>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-400 mt-2">
              <p>View your complete transaction history</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button 
            variant="destructive" 
            onClick={handleDisconnect} 
            className="w-full sm:w-auto font-medium"
          >
            Disconnect Wallet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
