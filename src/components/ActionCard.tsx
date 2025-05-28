
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  className?: string;
}

const ActionCard = ({ title, description, icon, to, className }: ActionCardProps) => {
  return (
    <Link
      to={to}
      className={cn(
        'glass-card flex flex-col p-6 transition-all duration-300 hover:border-maiga-accent group',
        className
      )}
    >
      <div className="mb-4 p-3 rounded-full w-12 h-12 flex items-center justify-center bg-maiga-secondary-dark/50 text-maiga-accent group-hover:bg-maiga-accent/20 group-hover:text-maiga-highlight transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-maiga-accent transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm flex-grow">{description}</p>
      <div className="mt-4 flex items-center text-maiga-accent group-hover:text-maiga-highlight transition-colors">
        <span className="text-sm font-medium">Learn more</span>
        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default ActionCard;
