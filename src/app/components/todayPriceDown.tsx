import { TiArrowSortedDown } from "react-icons/ti";
import Link from "next/link";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const TodayPriceDown = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    const products: Product[] = await res.json();

    const decreasedProducts = products
        .filter((item) => item.change.dir === "down")
        .slice(0, 6);

    const unitBn: Record<string, string> = {
        kg: "কেজি",
        piece: "টি",
        litre: "লিটার",
        dozen: "ডজন"
    };

    const toBanglaNumber = (number: number) => {
        return new Intl.NumberFormat("bn-BD").format(number);
    };

    return (
        <div className="max-w-6xl mx-auto py-6 rounded-2xl">

            <div className="flex items-center gap-2 mb-6">
                <span className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <TiArrowSortedDown />
                </span>

                <h2 className="text-xl font-bold text-slate-900">
                    আজ দাম কমেছে
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {decreasedProducts.map((item) => (
                    <Link
                        key={item.id}
                        href={`/products/${item.slug}`}
                        className="block bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex items-center gap-3 mb-4">

                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl">
                                {item.image}
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-800">
                                    {item.nameBn}
                                </h3>

                                <p className="text-xs text-slate-500">
                                    প্রতি {unitBn[item.unit] || item.unit}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500">
                                    আজকের দাম
                                </p>

                                <p className="text-xl font-bold text-slate-900">
                                    {toBanglaNumber(item.today)} টাকা
                                </p>
                            </div>

                            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                                <TiArrowSortedDown />
                                {toBanglaNumber(item.change.pct)}%
                            </div>

                        </div>

                    </Link>
                ))}

            </div>

        </div>
    );
};

export default TodayPriceDown;

