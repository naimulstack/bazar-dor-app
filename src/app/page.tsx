import Banner from "@/app/components/banner";
import TodayPriceUp from "@/app/components/todayPriceUp";
import TodayPriceDown from "@/app/components/todayPriceDown";
import AllProducts from "@/app/components/all-products";
import { Suspense } from "react";



export default function Home() {
  return (
    <div>

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-4xl font-bold text-green-600 animate-pulse">
              বাজার দর লোড হচ্ছে...
            </p>
          </div>
        }
      >
        <Banner />
        <TodayPriceUp />
        <TodayPriceDown />
        <AllProducts />
      </Suspense>


    </div >
  );
}
