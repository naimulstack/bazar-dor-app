import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

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

const ProductDetailsPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    const products: Product[] = await res.json();
    const product = products.find((item) => item.slug === slug);

    const unitBn: Record<string, string> = {
        kg: "কেজি",
        piece: "টি",
        litre: "লিটার",
        dozen: "ডজন",
    };

    const unit = unitBn[product?.unit?.toLowerCase() ?? ""] || product?.unit || "";

    const toBanglaNumber = (number: number) =>
        new Intl.NumberFormat("bn-BD").format(number);

    const price = (value: number) =>
        `${toBanglaNumber(value)} টাকা`;

    const priceChange = (today: number, yesterday: number) => {
        const difference = today - yesterday;

        if (difference > 0) {
            return (
                <span className="inline-flex flex-wrap items-center gap-1">
                    <strong className="font-bold text-black">বেড়েছে</strong>
                    <BsDot className="shrink-0" />
                    <span>{toBanglaNumber(difference)}</span>
                </span>
            );
        }

        if (difference < 0) {
            return (
                <span className="inline-flex flex-wrap items-center gap-1">
                    <strong className="font-bold text-black">কমেছে</strong>
                    <BsDot className="shrink-0" />
                    <span>{toBanglaNumber(Math.abs(difference))}</span>
                </span>
            );
        }

        return <span>দাম অপরিবর্তিত</span>;
    };

    return (
        <main className="min-h-screen bg-[#f0f5f0] text-[#26352b]">
            <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
                <nav className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs text-gray-500 sm:mb-6 sm:gap-x-2 sm:text-sm">
                    <Link href="/" className="transition hover:text-green-700">
                        হোম
                    </Link>
                    <MdKeyboardArrowRight className="shrink-0 text-base" />
                    <Link href="/" className="transition hover:text-green-700">
                        পণ্যসমূহ
                    </Link>
                    <MdKeyboardArrowRight className="shrink-0 text-base" />
                    <span className="break-words font-medium text-gray-700">
                        {product?.nameBn}
                    </span>
                </nav>

                <section className="mb-4 flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                            {product?.image}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h1 className="break-words text-xl font-bold sm:text-2xl lg:text-3xl">
                                {product?.nameBn}
                            </h1>

                            <p className="mt-1 break-words text-xs leading-5 text-gray-500 sm:text-sm">
                                প্রতি {unit} · {product?.categoryNameBn}
                            </p>

                            <p className="mt-2 flex flex-wrap items-center gap-x-1 text-xs leading-6 text-gray-600 sm:text-sm">
                                <span>গতকালের তুলনায় আজ দাম</span>
                                {product
                                    ? priceChange(product.today, product.yesterday)
                                    : "—"}
                                {product && (
                                    <span className="text-gray-600">টাকা</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="w-full rounded-xl bg-[#f0f5f0] p-4 text-center sm:p-5 lg:w-48 lg:shrink-0 lg:px-6">
                        <p className="text-sm text-gray-500">আজকের দাম</p>

                        <p className="my-1 text-3xl font-bold sm:text-4xl">
                            {product ? toBanglaNumber(product.today) : "—"}
                        </p>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            টাকা / {unit}
                        </p>

                        <p
                            className={`mt-2 flex items-center justify-center gap-1 text-lg font-semibold sm:text-xl ${
                                product?.change.dir === "up"
                                    ? "text-red-500"
                                    : product?.change.dir === "down"
                                      ? "text-green-600"
                                      : "text-gray-500"
                            }`}
                        >
                            {product?.change.dir === "up" ? (
                                <TiArrowSortedUp />
                            ) : product?.change.dir === "down" ? (
                                <TiArrowSortedDown />
                            ) : (
                                "—"
                            )}
                            {toBanglaNumber(product?.change.pct ?? 0)}%
                        </p>
                    </div>
                </section>

                <section className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mb-10 sm:p-6">
                    <h2 className="mb-4 text-base font-bold sm:text-lg">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:p-5">
                            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

                            <p className="mt-2 break-words text-xl font-bold text-green-600 sm:text-2xl">
                                {product?.markets?.length
                                    ? price(
                                          Math.min(
                                              ...product.markets.map(
                                                  (market) => market.min
                                              )
                                          )
                                      )
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-500">
                                সবচেয়ে কম দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:p-5">
                            <p className="text-sm text-gray-600">সর্বাধিক দাম</p>

                            <p className="mt-2 break-words text-xl font-bold text-red-600 sm:text-2xl">
                                {product?.markets?.length
                                    ? price(
                                          Math.max(
                                              ...product.markets.map(
                                                  (market) => market.max
                                              )
                                          )
                                      )
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-500">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-[#fbfdfb] p-4 sm:p-5">
                            <p className="text-sm text-gray-600">গড় দাম</p>

                            <p className="mt-2 break-words text-xl font-bold text-green-600 sm:text-2xl">
                                {product?.markets?.length
                                    ? price(
                                          Math.round(
                                              product.markets.reduce(
                                                  (total, market) =>
                                                      total +
                                                      (market.min + market.max) / 2,
                                                  0
                                              ) / product.markets.length
                                          )
                                      )
                                    : "—"}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-gray-500">
                                প্রতি {unit || "ইউনিট"}-এর হিসাবে
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8">
                        <h2 className="mb-4 text-base font-bold sm:text-lg">
                            বাজারভিত্তিক আজকের দাম
                        </h2>

                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full min-w-[560px] border-collapse text-xs sm:min-w-[650px] sm:text-sm">
                                <thead className="bg-[#f8faf8] text-gray-600">
                                    <tr>
                                        <th className="whitespace-nowrap px-3 py-3 text-left sm:px-4">
                                            বাজার
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 text-left sm:px-4">
                                            বিভাগ
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                                            সর্বনিম্ন
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                                            সর্বোচ্চ
                                        </th>
                                        <th className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                                            গড়
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {product?.markets?.map((market, index) => (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={`border-t border-gray-200 ${
                                                index % 2 === 0
                                                    ? "bg-white"
                                                    : "bg-[#f0f5f0]"
                                            }`}
                                        >
                                            <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                                                {market.market}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3 sm:px-4">
                                                {market.division}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                                                {price(market.min)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                                                {price(market.max)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4">
                                                {price(
                                                    Math.round(
                                                        (market.min + market.max) / 2
                                                    )
                                                )}
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