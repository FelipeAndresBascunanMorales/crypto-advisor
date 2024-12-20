"use client"
// components/BuyButton.jsx
import { Button } from '@/components/ui/button';
import { trackAffiliateClick, getAffiliateLink } from '@/utils/affiliate'
import { usePrice } from '@/hooks/usePrice';

interface BuyButtonProps {
  crypto: {
    id: string;
    symbol: string;
  };
  exchange: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ crypto, exchange }) => {
  const { price, priceChange } = usePrice(crypto.id);
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        onClick={() => {
          trackAffiliateClick(exchange, crypto.id);
          window.open(getAffiliateLink(exchange, crypto.symbol), '_blank');
        }}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Buy {crypto.symbol.toUpperCase()}
        {priceChange > 0 && <span className="ml-2 text-xs">↗️ Rising</span>}
      </Button>
      {/* <p className="text-xs text-gray-500">
        Best price on {exchange}: ${price}
      </p> */}
    </div>
  );
};