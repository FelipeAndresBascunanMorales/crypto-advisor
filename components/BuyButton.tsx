"use client"
// components/BuyButton.jsx
import { Button } from '@/components/ui/button';
import { trackAffiliateClick, getAffiliateLink } from '@/utils/affiliate'

interface BuyButtonProps {
  crypto: {
    id: string;
    symbol: string;
    price_change_percentage_24h: number;
  };
  exchange: string;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ crypto, exchange }) => {
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <Button
        onClick={() => {
          trackAffiliateClick(exchange, crypto.id);
          window.open(getAffiliateLink(exchange, crypto.symbol), '_blank');
        }}
        className="w-full bg-pink-600 hover:bg-pink-700"
      >
        Buy {crypto.symbol.toUpperCase()}
      </Button>
      {crypto.price_change_percentage_24h > 0 && <span className="ml-2 text-xs">↗️ Rising</span>}
      {/* <p className="text-xs text-gray-500">
        Best price on {exchange}: ${price}
      </p> */}
    </div>
  );
};