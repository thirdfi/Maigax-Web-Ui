
import React, { useState } from 'react';
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Check, Copy, Gift, Info, Wallet } from "lucide-react";
import WalletConnectButton from "@/components/WalletConnectButton";
import ProgressBar from "@/components/ProgressBar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/components/Web3Provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Airdrop = () => {
  const { address, isConnected } = useWeb3();
  const [isClaiming, setIsClaiming] = useState(false);
  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const contractAddress = "0x123...abc"; // This would normally come from your config or API
  const fullContractAddress = "0x123456789abcdef123456789abcdef123456789"; // Full contract address for tooltip

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    }
  };

  const handleCopyContractAddress = () => {
    navigator.clipboard.writeText(fullContractAddress);
    toast({
      title: "Contract address copied",
      description: "Contract address copied to clipboard",
    });
  };

  const handleClaimAirdrop = () => {
    setIsClaiming(true);
    
    // Mock claim process
    setTimeout(() => {
      setIsClaiming(false);
      toast({
        title: "Airdrop Claimed!",
        description: "You've successfully claimed 5,000 oMAIGA tokens.",
      });
    }, 2000);
  };

  return (
    <div className="container px-4 pt-4 sm:pt-8 pb-16 md:px-6">
      <PageHeader
        title="MAIGA Airdrop"
        description="Check eligibility and claim your oMAIGA token airdrop"
        className="mb-4 sm:mb-8"
      />
      
      {!isConnected ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to check your airdrop eligibility
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-8">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-maiga-accent/20 to-maiga-highlight/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maiga-accent/30 to-maiga-highlight/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maiga-accent to-maiga-highlight flex items-center justify-center">
                    <Gift className="h-6 w-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
            <WalletConnectButton 
              size="lg" 
              className="w-full sm:w-auto bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium" 
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Airdrop Allocation</CardTitle>
              <CardDescription>
                Claim your oMAIGA token allocation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="text-sm font-medium text-muted-foreground">Wallet Address</div>
                  <div className="flex items-center">
                    <div className="text-sm font-mono bg-maiga-secondary-dark/30 px-3 py-1 rounded break-all mr-2 max-w-full">
                      {address || ""}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={handleCopyAddress}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border border-maiga-accent/20 rounded-lg bg-maiga-secondary-dark/10">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Total oMAIGA allocation</div>
                  <div className="text-3xl font-bold flex items-center">
                    5,000 <span className="text-maiga-accent ml-2">oMAIGA</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Estimated value: $9,150</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Airdrop Status</span>
                    <span className="text-sm font-medium text-green-400 flex items-center">
                      <Check className="h-4 w-4 mr-1" /> Eligible
                    </span>
                  </div>
                  <ProgressBar 
                    value={100} 
                    max={100} 
                    label="Unlock Status" 
                    size="md"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    100% of your airdrop is available for claiming
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium"
                  disabled={isClaiming}
                  onClick={handleClaimAirdrop}
                >
                  {isClaiming ? "Claiming..." : "Claim oMAIGA"}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col space-y-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">oMAIGA Information</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setOpenInfoDialog(true)}
                >
                  <Info className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Token Symbol</span>
                    <span className="text-sm font-medium">oMAIGA</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Contract</span>
                    <div className="flex items-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm font-mono text-maiga-accent cursor-help">{contractAddress}</span>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm font-mono bg-maiga-primary border-maiga-secondary-dark text-xs">
                          <div className="flex items-center gap-2">
                            <span>{fullContractAddress}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 text-maiga-accent hover:text-maiga-highlight" 
                              onClick={handleCopyContractAddress}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Price</span>
                    <span className="text-sm font-medium">$1.83</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Supply</span>
                    <span className="text-sm font-medium">85,000,000</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Circulating Supply</span>
                    <span className="text-sm font-medium">42,573,108</span>
                  </div>

                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-maiga-accent/50 text-maiga-accent hover:text-maiga-highlight"
                    >
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Redeem for MAIGA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Airdrop Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Snapshot Taken</div>
                        <div className="text-xs text-muted-foreground">April 15, 2025</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Airdrop Announcement</div>
                        <div className="text-xs text-muted-foreground">April 30, 2025</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Claim Period Starts</div>
                        <div className="text-xs text-muted-foreground">May 15, 2025</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                        <Wallet className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Claim Period Ends</div>
                        <div className="text-xs text-muted-foreground">August 15, 2025</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      <Dialog open={openInfoDialog} onOpenChange={setOpenInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About oMAIGA Tokens</DialogTitle>
            <DialogDescription>
              Learn more about oMAIGA tokens and their utility in the MAIGA ecosystem
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              oMAIGA tokens are the pre-launch version of MAIGA tokens. They can be redeemed 1:1 for MAIGA 
              tokens or held for potential staking rewards.
            </p>
            <p className="text-sm">
              Key features of oMAIGA:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Redeemable 1:1 for MAIGA tokens</li>
              <li>Eligible for ecosystem incentives</li>
              <li>Tradable on select exchanges</li>
              <li>Proof of early ecosystem participation</li>
            </ul>
            <p className="text-sm mt-4">
              Your airdropped oMAIGA tokens are fully unlocked and ready to claim. Once claimed,
              you can redeem them for MAIGA tokens or hold them for potential future value.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Airdrop;
