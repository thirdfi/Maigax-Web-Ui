
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/PageHeader";
import ProgressBar from "@/components/ProgressBar";
import WalletConnectButton from "@/components/WalletConnectButton";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/components/Web3Provider";

const Claim = () => {
  const { isConnected } = useWeb3();
  const [isClaiming, setIsClaiming] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { toast } = useToast();
  
  const handleClaim = () => {
    setIsClaiming(true);
    
    // Mock claim process
    setTimeout(() => {
      setIsClaiming(false);
      toast({
        title: "Success!",
        description: "You've successfully claimed your oMAIGA tokens.",
        variant: "default",
      });
    }, 2000);
  };
  
  const handleRedeem = () => {
    setIsRedeeming(true);
    
    // Mock redeem process
    setTimeout(() => {
      setIsRedeeming(false);
      toast({
        title: "Success!",
        description: "Your oMAIGA tokens have been redeemed for MAIGA.",
        variant: "default",
      });
    }, 2000);
  };
  
  return (
    <div className="container px-4 pt-4 sm:pt-8 pb-16 md:px-6">
      <PageHeader
        title="Claim & Redeem"
        description="Manage your oMAIGA tokens and redeem for MAIGA"
        className="mb-4 sm:mb-8"
      />
      
      {!isConnected ? (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to view your claimable tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-8">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-maiga-accent/20 to-maiga-highlight/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-maiga-accent/30 to-maiga-highlight/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-maiga-accent to-maiga-highlight"></div>
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
              <CardTitle>oMAIGA Balance</CardTitle>
              <CardDescription>
                Your claimable and locked oMAIGA tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Balance of oMAIGA to claim</div>
                  <div className="text-3xl font-bold">12,500</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-muted-foreground">Unlocked amount</span>
                    <span className="text-sm font-medium text-green-400">75%</span>
                  </div>
                  <ProgressBar 
                    value={75} 
                    max={100} 
                    label="Unlock Progress" 
                    size="md"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Next unlock: 1,250 oMAIGA in 7 days
                  </p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    className="w-full bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium"
                    disabled={isClaiming}
                    onClick={handleClaim}
                  >
                    {isClaiming ? "Claiming..." : "Claim oMAIGA"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full border-maiga-accent/50 text-maiga-accent hover:text-maiga-highlight"
                    disabled={isRedeeming}
                    onClick={handleRedeem}
                  >
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    {isRedeeming ? "Redeeming..." : "Redeem oMAIGA to MAIGA"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Unlock Schedule</CardTitle>
                <CardDescription>
                  Your oMAIGA token release timeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-maiga-secondary-dark/50 pb-2">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-muted-foreground">Amount</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">May 21, 2025</span>
                    <span className="text-sm font-medium">1,250 oMAIGA</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">June 21, 2025</span>
                    <span className="text-sm font-medium">1,250 oMAIGA</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">July 21, 2025</span>
                    <span className="text-sm font-medium">1,250 oMAIGA</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Alert variant="default" className="bg-amber-950/30 border-amber-900/50 text-amber-300">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-sm">
                Important: Once claimed, wallet address changes are not allowed. 
                To request a whitelist address change, please <Link to="#" className="underline font-medium">fill out this form</Link>.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default Claim;
