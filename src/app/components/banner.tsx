import Image from "next/image";
import bannerImage from "../../../public/Images/bazar-hero.png";
import Link from "next/link";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="mx-auto my-5 grid max-w-6xl w-full grid-cols-1 items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-6 sm:grid-cols-3 sm:px-8 lg:px-8">

            <div className="space-y-4 sm:col-span-2">
                <div>
                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                        {date}
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-slate-600 lg:text-base">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                    দামের পরিবর্তন এক জায়গায়।
                </p>

                <div className="pt-2">
                    <Link
                        href="#all-products"
                        className="inline-block rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>
            </div>

            <div className="flex justify-center sm:justify-end">
                <Image
                    src={bannerImage}
                    alt="Bazar Dor banner image"
                    width={300}
                    height={300}
                    priority
                    className="h-auto w-48 object-contain sm:w-full"
                />
            </div>
        </div>
    );
};

export default Banner;