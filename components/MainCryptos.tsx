import { Suspense } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import { ExternalLink } from "lucide-react";
import { ArrowDownRight } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { BuyButton } from "./BuyButton";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

type CryptoData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
};

const UNIQ_EXCHANGE = 'binance'

const response = await fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
);
const data = (await response.json()) as CryptoData[];


console.log(data);

const formatNumber = (num: number) => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(1)}B`;
  }
  if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`;
  }
  return `$${num.toLocaleString()}`;
};

export default function MainCryptos() {

  return (
    <Card className="basis-2/5 bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Top Cryptocurrencies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.length > 0 &&
            data.map((crypto) => (
              <div
              key={crypto.id}
              className="group relative flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-100"
              >
                {/* Left section - Name and Symbol */}
              <Avatar className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                <AvatarImage
                className="size-full rounded-[inherit] object-cover"
                  src={crypto.image}
                  alt={crypto.id}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
                <div className="flex items-center space-x-4">
                  

                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-lg text-gray-900">
                        {crypto.name}
                      </span>
                      <span className="text-sm text-gray-500 uppercase">
                        {crypto.symbol}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right section - Price and Stats */}
                <div className="flex items-center space-x-8">
                  {/* Price and Change */}
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900">
                      {formatNumber(crypto.current_price)}
                    </div>
                    <div
                      className={`flex items-center justify-end text-sm font-medium ${
                        crypto.price_change_percentage_24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {crypto.price_change_percentage_24h >= 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span>
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </div>

                  {/* Market Cap */}
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-gray-500">
                      Market Cap
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formatNumber(crypto.market_cap)}
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-medium text-gray-500">
                      Volume (24h)
                    </div>
                    <div className="font-semibold text-gray-900">
                      {formatNumber(crypto.total_volume)}
                    </div>
                  </div>

                  {/* External Link */}
                  <a
                    href={`https://www.coingecko.com/en/coins/${crypto.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                  </a>
                  <Suspense fallback="loading...">
                    <BuyButton crypto={crypto} exchange={UNIQ_EXCHANGE} />
                  </Suspense>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
