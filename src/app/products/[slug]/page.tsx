import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { TiArrowSortedUp, TiArrowSortedDown, } from "react-icons/ti";



interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
    markets: {
        market: string;
        division: string;
        min: number;
        max: number;
    }[];
}

const ProductDetailsPage = async ({ params, }: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products"
    );

    const products: Product[] = await res.json();

    const product = products.find((item) => item.slug === slug);

    const unitBn: Record<string, string> = {
        kg: "কেজি",
        piece: "টি",
        litre: "লিটার",
        dozen: "ডজন",
    };

    const toBanglaNumber = (number: number) =>
        new Intl.NumberFormat("bn-BD").format(number);

    const price = (value: number) =>
        `${toBanglaNumber(value)} টাকা`;

    const priceCards = [
        { title: "আজকের দাম", value: product?.today },
        { title: "গতকালের দাম", value: product?.yesterday },
        { title: "গত সপ্তাহের দাম", value: product?.lastWeek },
        { title: "গত মাসের দাম", value: product?.lastMonth },
    ];

    const priceChange = (today: number, yesterday: number) => {
        const difference = today - yesterday;

        if (difference > 0) {
            return (
                <>
                    <strong className="font-bold text-black">
                        বেড়েছে
                    </strong>{" "} <BsDot className="inline" />
                    {toBanglaNumber(difference)}
                </>
            );
        }

        if (difference < 0) {
            return (
                <>
                    <strong className="font-bold text-black">
                        কমেছে <BsDot className="inline" />
                    </strong>{" "}
                    {toBanglaNumber(Math.abs(difference))}
                </>
            );
        }

        return <span>গতকালের তুলনায় দাম অপরিবর্তিত</span>;
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] text-[#26352b]">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">

                <nav className="mb-6 flex flex-wrap gap-2 text-sm text-gray-500">
                    <Link href="/">
                        হোম
                    </Link>
                    <span>
                        <MdKeyboardArrowRight />
                    </span>
                    <Link href="/">
                        পণ্যসমূহ
                    </Link>
                    <span>
                        <MdKeyboardArrowRight />
                    </span>
                    <span>
                        {product?.nameBn}
                    </span>
                </nav>

                <section className="mb-5 flex flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:p-6">

                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#f0f5f0] text-4xl">
                            {product?.image}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold sm:text-3xl">
                                {product?.nameBn}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                প্রতি{" "}
                                {unitBn[product?.unit?.toLowerCase() ?? ""] || product?.unit}{" "} · {" "}
                                {product?.categoryNameBn}
                            </p>

                            <p className="mt-2 text-sm text-black whitespace-nowrap">
                                {" "}গতকালের তুলনায় আজ দাম {" "}
                                {product
                                    ? priceChange(product.today, product.yesterday)
                                    : "—"} টাকা
                            </p>
                        </div>
                    </div>

                    <div className="min-w-36 rounded-xl bg-[#f0f5f0] px-6 py-4 text-center">
                        <p className="text-sm text-gray-500">
                            আজকের দাম
                        </p>

                        <p className="my-1 text-3xl font-bold">
                            {product ? toBanglaNumber(product.today) : "—"}
                        </p>

                        <p className="text-sm text-gray-500">
                            টাকা / {unitBn[product?.unit?.toLowerCase() ?? ""]}
                        </p>

                        <p className={`flex mt-2 text-xl font-semibold items-center ${product?.change.dir === "up"
                            ? "text-red-500"
                            : product?.change.dir === "down"
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}>
                            {product?.change.dir === "up"
                                ? <TiArrowSortedUp />
                                : product?.change.dir === "down"
                                    ? <TiArrowSortedDown />
                                    : "—"}{" "}
                            {toBanglaNumber(product?.change.pct ?? 0)}%
                        </p>
                    </div>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 mb-10">
                    <h2 className="mb-4 text-lg font-bold">
                        দামের সারসংক্ষেপ
                    </h2>


                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4">
                            <p className="text-sm text-black">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="mt-2 text-xl font-bold text-green-600">
                                {product?.markets?.length
                                    ? price(
                                        Math.min(
                                            ...product.markets.map((market) => market.min)
                                        )
                                    )
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs text-black">
                               সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        {/* সর্বাধিক দাম */}
                        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4">
                            <p className="text-sm text-black">
                                সর্বাধিক দাম
                            </p>

                            <p className="mt-2 text-xl font-bold text-red-600">
                                {product?.markets?.length
                                    ? price(
                                        Math.max(
                                            ...product.markets.map((market) => market.max)
                                        )
                                    )
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs text-black">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        {/* গড় দাম */}
                        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4">
                            <p className="text-sm text-black">
                                গড় দাম
                            </p>

                            <p className="mt-2 text-xl font-bold text-green-600">
                                {product?.markets?.length
                                    ? price(
                                        Math.round(
                                            product.markets.reduce(
                                                (total, market) =>
                                                    total + (market.min + market.max) / 2,
                                                0
                                            ) / product.markets.length
                                        )
                                    )
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs text-black">
                                প্রতি কেজি-এর হিসাবে
                            </p>
                        </div>

                    </div>

                    <div className="mt-7">
                        <h2 className="mb-4 text-lg font-bold">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full min-w-[600px] border-collapse text-sm">
                                <thead className="bg-[#f8faf8] text-gray-600">
                                    <tr>
                                        <th className="px-4 py-3 text-left">বাজার</th>
                                        <th className="px-4 py-3 text-left">বিভাগ</th>
                                        <th className="px-4 py-3 text-right">সর্বনিম্ন</th>
                                        <th className="px-4 py-3 text-right">সর্বোচ্চ</th>
                                        <th className="px-4 py-3 text-right">গড়</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {product?.markets?.map((market, index) => (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={`border-t ${index % 2 === 0
                                                ? "bg-white"
                                                : "bg-[#f0f5f0]"
                                                }`}
                                        >
                                            <td className="px-4 py-3">{market.market}</td>
                                            <td className="px-4 py-3">{market.division}</td>
                                            <td className="px-4 py-3 text-right">
                                                {price(market.min)}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                {price(market.max)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold">
                                                {price((market.min + market.max) / 2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
};

export default ProductDetailsPage;
