import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import ActionCard from "@/components/ActionCard";
import WalletConnectButton from "@/components/WalletConnectButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Coins, ArrowRightLeft, Gift, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import PriceChart from "@/components/PriceChart";
import maigaLogo from "../assets/maigaxbt.jpg";

const Index = () => {
  return (
    <div className="container px-4 pt-8 pb-16 md:px-6 w-full">
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <section className="glass-card p-6 md:p-8 lg:p-12 rounded-2xl mb-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-start lg:justify-between">
            {/* Left Content */}
            <div className="flex-1 lg:max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                MaigaXBT
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                Access your oMAIGA tokens, incentives, and airdrops in one place.
                Earn rewards and trade with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <WalletConnectButton size="lg" className="bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium" />
                <Button variant="outline" size="lg">
                  <Link to="https://coinmarketcap.com/currencies/maiga/" target="_blank" className="flex items-center">
                    View on CoinMarketCap
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Right Chart - Reduced width and improved spacing */}
            <div className="lg:w-96 xl:w-[28rem] lg:ml-8">
              <div className="relative">
                {/* Softened glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-maiga-accent/10 to-maiga-highlight/10 blur-lg rounded-xl"></div>
                
                {/* Chart container - reduced padding and improved integration */}
                <div className="relative bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-maiga-secondary-dark/30">
                  <PriceChart />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <PageHeader
            title="Token Statistics"
            description="Real-time metrics and performance data for MAIGA ecosystem"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <StatCard
              title="MAIGA in Circulation"
              value="127,845,299"
              trend="up"
              description="Total circulating supply"
            />
            <StatCard
              title="oMAIGA Claimed"
              value="42,573,108"
              trend="neutral"
              description="Out of 85,000,000 total"
            />
            <StatCard
              title="Total Volume (24h)"
              value="$5,427,912"
              trend="down"
              description="Combined DEX + CEX volume"
            />
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <PageHeader title="External Markets" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="stats-card hover:border-maiga-accent transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                <Link to="https://dexscreener.com" target="_blank" className="text-center">
                  <div className="text-maiga-accent mb-2">DexScreener</div>
                  <div className="text-xs text-muted-foreground">View market data</div>
                </Link>
              </CardContent>
            </Card>

            <Card className="stats-card hover:border-maiga-accent transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                <Link to="https://geckoterminal.com" target="_blank" className="text-center">
                  <div className="text-maiga-accent mb-2">GeckoTerminal</div>
                  <div className="text-xs text-muted-foreground">Advanced analytics</div>
                </Link>
              </CardContent>
            </Card>

            <Card className="stats-card hover:border-maiga-accent transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                <Link to="https://coingecko.com" target="_blank" className="text-center">
                  <div className="text-maiga-accent mb-2">CoinGecko</div>
                  <div className="text-xs text-muted-foreground">Price tracking</div>
                </Link>
              </CardContent>
            </Card>

            <Card className="stats-card hover:border-maiga-accent transition-colors">
              <CardContent className="p-4 flex flex-col items-center justify-center h-24">
                <Link to="https://coinmarketcap.com/currencies/" target="_blank" className="text-center">
                  <div className="text-maiga-accent mb-2">CoinMarketCap</div>
                  <div className="text-xs text-muted-foreground">Trade tokens</div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Actions Section */}
        <section>
          <PageHeader title="Main Actions" description="Access core platform features" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              title="Claim oMAIGA"
              description="Redeem your allocated oMAIGA tokens or convert to MAIGA"
              icon={<Wallet className="h-6 w-6" />}
              to="/claim"
            />

            <ActionCard
              title="Incentives"
              description="Earn rewards for trading activity and platform engagement"
              icon={<Coins className="h-6 w-6" />}
              to="/incentives"
            />

            <ActionCard
              title="Airdrop"
              description="Check eligibility and claim your MAIGA airdrop allocation"
              icon={<Gift className="h-6 w-6" />}
              to="/airdrop"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
