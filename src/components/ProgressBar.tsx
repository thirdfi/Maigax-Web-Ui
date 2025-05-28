
import React from 'react';
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  indicatorClassName?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  className,
  indicatorClassName
}) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  
  const heightClass = 
    size === 'sm' ? 'h-2' : 
    size === 'lg' ? 'h-6' : 
    'h-4';
  
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className={cn(
              "font-medium",
              percentage >= 80 ? "text-green-400" : 
              percentage >= 50 ? "text-amber-400" : 
              percentage >= 30 ? "text-orange-400" : 
              "text-muted-foreground"
            )}>
              {percentage}%
            </span>
          )}
        </div>
      )}
      
      <div 
        className={cn(
          heightClass,
          "w-full bg-maiga-secondary-dark/30 rounded-full overflow-hidden",
          className
        )}
      >
        <div 
          className={cn(
            "h-full bg-gradient-to-r from-maiga-accent to-maiga-highlight",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
