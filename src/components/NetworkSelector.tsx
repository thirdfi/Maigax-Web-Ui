
import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-mobile'

interface Network {
  id: string
  name: string
  icon: React.ReactNode
}

const networks: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: <div className="w-4 h-4 rounded-full bg-purple-500" />
  },
  {
    id: 'polygon',
    name: 'Polygon',
    icon: <div className="w-4 h-4 rounded-full bg-purple-700" />
  },
  {
    id: 'bsc',
    name: 'BSC',
    icon: <div className="w-4 h-4 rounded-full bg-yellow-500" />
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    icon: <div className="w-4 h-4 rounded-full bg-blue-500" />
  }
]

interface NetworkSelectorProps {
  className?: string
}

const NetworkSelector = ({ className }: NetworkSelectorProps) => {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0])
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")
  
  const handleNetworkChange = (network: Network) => {
    setSelectedNetwork(network)
    setIsOpen(false)
  }
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={isMobile ? "icon" : "sm"}
          className={cn(
            "relative bg-maiga-secondary-dark/30 border-maiga-secondary-dark transition-all",
            !isMobile && !isSmallScreen ? "min-w-[120px] px-3" : "h-10 w-10",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {selectedNetwork.icon}
            {!isMobile && !isSmallScreen && (
              <span className="text-sm font-medium text-white">{selectedNetwork.name}</span>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-maiga-primary border-maiga-secondary-dark"
      >
        <div className="px-2 py-2 text-xs font-medium text-muted-foreground">
          Select Network
        </div>
        {networks.map((network) => (
          <DropdownMenuItem
            key={network.id}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleNetworkChange(network)}
          >
            <div className="flex items-center gap-2">
              {network.icon}
              <span>{network.name}</span>
            </div>
            {selectedNetwork.id === network.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NetworkSelector
