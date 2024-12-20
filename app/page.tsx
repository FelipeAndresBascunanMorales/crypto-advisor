import MainCryptos from '@/components/MainCryptos';
import PromisingList from '@/components/PromisingList';
import { Suspense } from 'react';

export default async function Home() {


  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8">
      {/* Main Cryptocurrencies */}
      <Suspense fallback="loading...">
        <MainCryptos />
      </Suspense>

      {/* Promising Cryptocurrencies */}

      <PromisingList />
    </div>
  );
};