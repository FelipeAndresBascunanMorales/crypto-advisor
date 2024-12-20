// utils/affiliateLinks.js
const AFFILIATE_IDS = {
    binance: 'YOUR_BINANCE_ID',
    coinbase: 'YOUR_COINBASE_ID',
    // Add more exchanges
  };
  
  export const getAffiliateLink = (exchange: string, cryptoId: string) => {
    switch(exchange) {
      case 'binance':
        // return `https://www.binance.com/en/trade/${cryptoId}_USDT?ref=${AFFILIATE_IDS.binance}`;
        return `https://www.binance.com/en/trade/${cryptoId}_USDT`;
      case 'coinbase':
        return `https://www.coinbase.com/join/${AFFILIATE_IDS.coinbase}?src=android-share`;
      default:
        return '';
    }
  };

  // utils/analytics.js
export const trackAffiliateClick = (exchange: string, cryptoId: string) => {
    // // If using Google Analytics
    // gtag('event', 'affiliate_click', {
    //   'exchange': exchange,
    //   'crypto': cryptoId,
    //   'timestamp': new Date().toISOString()
    // });
    
    // You could also log to your backend
    fetch('/api/track-click', {
      method: 'POST',
      body: JSON.stringify({
        exchange,
        cryptoId,
        timestamp: new Date()
      })
    });
  };