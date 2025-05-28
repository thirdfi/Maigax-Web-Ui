
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import WalletConnectButton from "./WalletConnectButton";
import NetworkSelector from "./NetworkSelector";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import maigaLogo from "../assets/maigaxbt.jpg";

const MainNav = () => {
  const location = useLocation();

  const navigation = [
    { name: "Claim", href: "/claim" },
    { name: "Incentives", href: "/incentives" },
    { name: "Airdrop", href: "/airdrop" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-maiga-secondary-dark bg-maiga-primary/70 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={maigaLogo}
              alt="MAIGA"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-display font-bold text-xl tracking-tight">MAIGA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-maiga-highlight",
                  isActive(item.href)
                    ? "text-maiga-highlight"
                    : "text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-maiga-accent rounded-full border border-maiga-primary"></span>
          </Button>

          <NetworkSelector className="hidden md:flex mr-1" />

          <WalletConnectButton className="hidden md:flex" />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-maiga-primary border-maiga-secondary-dark">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b border-maiga-secondary-dark">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maiga-accent to-maiga-highlight"></div>
                    <span className="font-display font-bold text-xl tracking-tight">MAIGA</span>
                  </Link>
                </div>

                <div className="flex flex-col gap-4 py-4">
                  <div className="flex gap-2">
                    <NetworkSelector className="flex-shrink-0" />
                    <WalletConnectButton className="w-full" />
                  </div>
                </div>

                <nav className="flex flex-col gap-1 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "px-2 py-2 text-sm font-medium transition-colors rounded-md",
                        isActive(item.href)
                          ? "bg-maiga-secondary-dark/50 text-maiga-highlight"
                          : "text-white hover:bg-maiga-secondary-dark/30"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
