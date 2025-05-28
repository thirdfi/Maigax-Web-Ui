
import { useState, useEffect } from 'react';

interface TokenPriceProps {
  symbol: string;
  priceChange?: boolean;
}

const TokenPrice = ({ symbol, priceChange = true }: TokenPriceProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  
  // Mock data - this would be replaced with actual API calls
  useEffect(() => {
    const mockFetch = () => {
      setLoading(true);
      setTimeout(() => {
        if (symbol === 'MAIGA') {
          setPrice(2.41);
          setChange(5.2);
        } else if (symbol === 'oMAIGA') {
          setPrice(1.83);
          setChange(-1.4);
        }
        setLoading(false);
      }, 1000);
    };
    
    mockFetch();
    const interval = setInterval(mockFetch, 30000); // Update every 30s
    
    return () => clearInterval(interval);
  }, [symbol]);
  
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-maiga-secondary-dark/50 animate-pulse h-6 w-24 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-white">{symbol}: <span className="text-maiga-highlight">${price?.toFixed(2)}</span></span>
      {priceChange && (
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${change >= 0 ? 'bg-green-900/60 text-green-300' : 'bg-red-900/60 text-red-300'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
      )}
    </div>
  );
};

export default TokenPrice;
