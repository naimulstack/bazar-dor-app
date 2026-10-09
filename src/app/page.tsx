import Banner from "@/app/components/banner";
import TodayPriceUp from "@/app/components/todayPriceUp";
import TodayPriceDown from "@/app/components/todayPriceDown";
import AllProducts from "@/app/components/all-products";


export default function Home() {
  return (
    <div>

    <Banner />
    <TodayPriceUp />
    <TodayPriceDown />
    <AllProducts/>
    

    </div>
  );
}
