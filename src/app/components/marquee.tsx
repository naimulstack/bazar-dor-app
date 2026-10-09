
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

interface Product {
    id: number;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const Marquee = async () => {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products"
    );

    const data = await res.json();

    const products: Product[] = Array.isArray(data)
        ? data
        : data.products ?? [];

    const unitBn: Record<string, string> = {
        kg: "কেজি",
        piece: "টি",
        litre: "লিটার",
        dozen: "ডজন",
    };

    const toBanglaNumber = (number: number) => {
        return new Intl.NumberFormat("bn-BD").format(number);
    };

    return (
        <div className="w-full overflow-hidden border-y border-slate-200 bg-slate-50 py-2.5">
            <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">

                {[...products, ...products].map((item, i) => {
                    const isUp = item.change.dir === "up";

                    return (
                        <div
                            key={`${item.id}-${i}`}
                            className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs shadow-sm md:text-sm"
                        >
                            <span className="text-base">
                                {item.image}
                            </span>

                            <span className="font-medium text-slate-700">
                                {item.nameBn}
                            </span>

                            <span className="font-semibold text-slate-900">
                                ৳{toBanglaNumber(item.today)}/
                                {unitBn[item.unit] || item.unit}
                            </span>

                            <span
                                className={`flex items-center font-bold ${
                                    isUp
                                        ? "text-emerald-600"
                                        : "text-rose-600"
                                }`}
                            >
                                {isUp ? (
                                    <TiArrowSortedUp size={22} />
                                ) : (
                                    <TiArrowSortedDown size={22} />
                                )}

                                {toBanglaNumber(item.change.pct)}%
                            </span>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default Marquee;

