import Banner from "@/app/components/banner";
import TodayPriceUp from "@/app/components/todayPriceUp";
import TodayPriceDown from "@/app/components/todayPriceDown";
import AllProducts from "@/app/components/all-products";
import Footer from "@/app/components/footer";


export default function Home() {
  return (
    <div>

    <Banner />
    <TodayPriceUp />
    <TodayPriceDown />
    <AllProducts/>
    <Footer/>

    </div>
  );
}
