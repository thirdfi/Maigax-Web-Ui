
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./components/Web3Provider";
import MainNav from "./components/MainNav";
import Index from "./pages/Index";
import Claim from "./pages/Claim";
import Incentives from "./pages/Incentives";
import Airdrop from "./pages/Airdrop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Web3Provider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainNav />
          <main className="min-h-[calc(100vh-64px)]">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/claim" element={<Claim />} />
              <Route path="/incentives" element={<Incentives />} />
              <Route path="/airdrop" element={<Airdrop />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Web3Provider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
