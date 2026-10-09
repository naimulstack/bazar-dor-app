import { TiArrowSortedUp, TiArrowSortedDown, } from "react-icons/ti";
import { LuMinus } from "react-icons/lu";

interface Product {
    id: number;
    nameBn: string;
    today: number;
    yesterday: number;
    unit: string;
    image: string;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const AllProducts = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    const products: Product[] = await res.json();

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

        <div
            id="all-products"
            className="max-w-6xl mx-auto py-6 rounded-2xl mb-10">
            <div className="my-3">
                <h2 className="text-xl font-bold text-slate-900">
                    সব পণ্য
                </h2>

                <p className="text-gray-500">
                    মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {products.map((item) => (
                    <div
                        key={item.id}
                        className="bg-slate-50 rounded-xl p-4 border border-slate-200"
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

                            <div>
                                {item.today > item.yesterday ? (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
                                        <TiArrowSortedUp />
                                        {toBanglaNumber(Math.abs(item.change.pct))}%
                                    </div>
                                ) : item.today < item.yesterday ? (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                                        <TiArrowSortedDown />
                                        {toBanglaNumber(Math.abs(item.change.pct))}%
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                                        <LuMinus />
                                        ০.০%
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default AllProducts;
