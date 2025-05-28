
import { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

// Mock data generator for chart
const generateMockData = (timeframe: string) => {
  let dataPoints = 0;
  let startPrice = 0.00010;
  let volatility = 0.00002;
  
  switch(timeframe) {
    case '1H':
      dataPoints = 60;
      break;
    case '1D':
      dataPoints = 24;
      break;
    case '1W':
      dataPoints = 7;
      break;
    case '1M':
      dataPoints = 30;
      break;
    case 'All':
      dataPoints = 90;
      volatility = 0.00004;
      break;
    default:
      dataPoints = 90;
  }
  
  const data = [];
  let currentPrice = startPrice;
  
  for (let i = 0; i < dataPoints; i++) {
    // Random price movement with downward trend
    const change = (Math.random() - 0.52) * volatility;
    currentPrice = Math.max(0.00001, currentPrice + change);
    
    data.push({
      time: i,
      price: currentPrice
    });
  }
  
  return data;
};

const timeRanges = ['1H', '1D', '1W', '1M', 'All'];

const PriceChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('All');
  const [chartData, setChartData] = useState<any[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0.00010);
  const [priceChange, setPriceChange] = useState(-2);
  
  // Update data when time range changes
  useEffect(() => {
    const data = generateMockData(selectedTimeRange);
    setChartData(data);
    
    // Set current price to the last data point
    if (data.length > 0) {
      setCurrentPrice(data[data.length - 1].price);
    }
  }, [selectedTimeRange]);
  
  const formatYAxis = (value: number) => {
    return `$${value.toFixed(5)}`;
  };
  
  const formatXAxis = (value: number) => {
    // Simple formatter to show some timestamps based on the selected timeframe
    if (selectedTimeRange === '1H') {
      return `${value}m`;
    } else if (selectedTimeRange === '1D') {
      return `${value}h`;
    } else if (selectedTimeRange === '1W') {
      return `D${value+1}`;
    } else if (selectedTimeRange === '1M') {
      return `D${value+1}`;
    }
    return `W${Math.floor(value/7)+1}`;
  };
  
  const chartConfig = {
    price: { 
      theme: {
        light: '#27c7a9', 
        dark: '#27c7a9'
      }
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Price Header - Reduced padding */}
      <div className="flex justify-between items-start mb-3 px-1">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Price</span>
          <span className="text-lg font-medium text-white">${currentPrice.toFixed(5)}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange)}% All Time
          </span>
        </div>
      </div>
      
      {/* Chart Container - Reduced height and better proportions */}
      <div className="flex-grow w-full h-48 md:h-56 mb-3">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 10, right: 15, left: 15, bottom: 35 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis 
                dataKey="time" 
                tickFormatter={formatXAxis}
                stroke="rgba(255,255,255,0.6)"
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.8)' }}
                tickMargin={6}
                height={30}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                domain={['auto', 'auto']}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.8)' }}
                tickCount={5}
                width={60}
                tickMargin={6}
              />
              <Tooltip 
                content={<ChartTooltipContent />} 
                isAnimationActive={false}
                cursor={{ stroke: 'rgba(39, 199, 169, 0.3)', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#27c7a9"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: '#27c7a9', strokeWidth: 2, fill: '#ffffff' }}
                isAnimationActive={true}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      {/* Time Range Buttons - Tighter spacing */}
      <div className="grid grid-cols-5 gap-1.5 px-1">
        {timeRanges.map(range => (
          <Button
            key={range}
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 text-xs font-medium transition-all duration-200",
              selectedTimeRange === range 
                ? "bg-maiga-accent/20 text-maiga-highlight border border-maiga-accent/30" 
                : "text-muted-foreground hover:text-white hover:bg-maiga-accent/10 border border-transparent"
            )}
            onClick={() => setSelectedTimeRange(range)}
          >
            {range}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PriceChart;
