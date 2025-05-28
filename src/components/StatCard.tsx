
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
  loading?: boolean;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({
  title,
  value,
  icon,
  description,
  className,
  loading = false,
  trend
}: StatCardProps) => {
  return (
    <Card className={cn("stats-card", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-9 bg-maiga-secondary-dark/30 rounded animate-pulse w-full"></div>
        ) : (
          <div className="text-2xl font-bold flex items-center gap-2">
            {value}
            {trend && (
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                trend === "up" ? "bg-green-950/60 text-green-400" : 
                trend === "down" ? "bg-red-950/60 text-red-400" : 
                "bg-gray-800/60 text-gray-400"
              )}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"} 
                {trend === "up" ? "+2.5%" : trend === "down" ? "-1.8%" : "0%"}
              </span>
            )}
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
