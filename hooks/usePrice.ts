// hooks/usePrice.ts (or .js)
'use client';

import { useState, useEffect } from 'react';

export const usePrice = (cryptoIds: string[]) => {
  const [priceData, setPriceData] = useState({
    price: null,
    priceChange: 0,
    lastUpdated: new Date,
    isLoading: true
  });

  useEffect(() => {
    let isMounted = true;

    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `/api/crypto/price?ids=${cryptoIds}`  // We'll create this API route
        );
        const data = await response.json();
        
        if (isMounted) {
          setPriceData({
            price: data.price,
            priceChange: data.priceChange,
            lastUpdated: new Date(),
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Error fetching price:', error);
        if (isMounted) {
          setPriceData(prev => ({ ...prev, isLoading: false }));
        }
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [cryptoIds]);

  return priceData;
};