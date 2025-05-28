
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge, BadgeCheck, BadgeDollarSign, Coins, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";

// Form schema for the APR calculator
const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid amount greater than 0",
  }),
  lockPeriod: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Please enter a valid lock period in days",
  }),
});

const Incentives = () => {
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [estimatedApr, setEstimatedApr] = useState<string | null>(null);
  const [estimatedRewards, setEstimatedRewards] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "1000",
      lockPeriod: "30",
    },
  });

  // Handle claiming oMAIGA
  const handleClaim = () => {
    setIsClaimLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsClaimLoading(false);
      toast({
        title: "Success!",
        description: "You've successfully claimed 250 oMAIGA tokens",
      });
    }, 2000);
  };

  // Handle APR calculation
  const onCalculate = (values: z.infer<typeof formSchema>) => {
    const amount = parseFloat(values.amount);
    const days = parseFloat(values.lockPeriod);
    
    // Simple APR calculation formula - this would be replaced with actual tokenomics
    const baseApr = 12; // 12% base APR
    const bonusFactor = Math.min(days / 365, 1) * 10; // Bonus of up to 10% for longer locks
    const calculatedApr = baseApr + bonusFactor;
    
    // Calculate estimated rewards
    const dailyRate = calculatedApr / 365 / 100;
    const totalRewards = amount * dailyRate * days;
    
    setEstimatedApr(calculatedApr.toFixed(2));
    setEstimatedRewards(totalRewards.toFixed(2));
  };

  return (
    <div className="container px-4 pt-4 sm:pt-8 pb-16 md:px-6">
      <PageHeader
        title="Incentives"
        description="Earn rewards by participating in the MAIGA ecosystem"
        className="mb-4 sm:mb-8"
      />
      
      <Tabs defaultValue="stats" className="mb-8">
        <TabsList>
          <TabsTrigger value="stats">Trading Stats</TabsTrigger>
          <TabsTrigger value="calculator">APR Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-6">
          {/* Account Trading Volume Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Trading Volume"
              value="$24,560.89"
              icon={<Coins className="text-maiga-accent" />}
              trend="up"
            />
            <StatCard
              title="Weekly Volume"
              value="$3,245.12"
              icon={<BadgeDollarSign className="text-maiga-accent" />}
              trend="up"
            />
            <StatCard
              title="Trading Rank"
              value="Silver"
              icon={<Badge className="text-maiga-accent" />}
              description="Top 15% of traders"
            />
            <StatCard
              title="Referral Earnings"
              value="$120.50"
              icon={<BadgeCheck className="text-maiga-accent" />}
              trend="up"
            />
          </div>
          
          {/* Claim Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-maiga-accent" />
                Claim oMAIGA Rewards
              </CardTitle>
              <CardDescription>
                Claim oMAIGA tokens based on your trading activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Available to Claim</div>
                  <div className="text-3xl font-bold">250 oMAIGA</div>
                  <div className="text-sm text-muted-foreground">≈ $457.50 at current price</div>
                </div>
                
                <Button 
                  className="w-full sm:w-auto bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium"
                  disabled={isClaimLoading}
                  onClick={handleClaim}
                >
                  {isClaimLoading ? "Claiming..." : "Claim oMAIGA"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          {/* APR Calculator */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-maiga-accent" />
                oMAIGA Staking Calculator
              </CardTitle>
              <CardDescription>
                Estimate your potential rewards from staking oMAIGA tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onCalculate)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount to Stake (oMAIGA)</FormLabel>
                          <FormControl>
                            <Input placeholder="1000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the amount of oMAIGA you want to stake
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lockPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lock Period (Days)</FormLabel>
                          <FormControl>
                            <Input placeholder="30" {...field} />
                          </FormControl>
                          <FormDescription>
                            Longer lock periods earn higher APR
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full sm:w-auto bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium"
                  >
                    Calculate Rewards
                  </Button>
                </form>
              </Form>
              
              {estimatedApr && (
                <div className="mt-8 p-4 border border-maiga-accent/30 rounded-md bg-maiga-accent/5">
                  <h3 className="text-lg font-medium mb-4">Estimated Returns</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated APR</p>
                      <p className="text-2xl font-bold">{estimatedApr}%</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Rewards</p>
                      <p className="text-2xl font-bold">{estimatedRewards} oMAIGA</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Incentives;
