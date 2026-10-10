"use client";

import { useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown, } from "react-icons/ti";
import { LuMinus } from "react-icons/lu";
import Link from "next/link";

interface Product {
    id: string;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    change: {
        dir: "up" | "down" | "same";
        pct: number;
    };
}

interface ProductListProps {
    products: Product[];
    categoryIcon?: string;
}

const ProductList = ({
    products,
    categoryIcon,
}: ProductListProps) => {
    const [sortBy, setSortBy] = useState("default");

    const unitBn: Record<string, string> = {
        kg: "কেজি",
        piece: "টি",
        litre: "লিটার",
        dozen: "ডজন",
    };

    const toBanglaNumber = (number: number) => {
        return new Intl.NumberFormat("bn-BD").format(number);
    };

    const sortedProducts = [...products].sort((a, b) => {

        if (sortBy === "low") {
            return a.today - b.today;
        }

        if (sortBy === "high") {
            return b.today - a.today;
        }

        return 0;
    });

    return (
        <div>
            <div className="mx-auto max-w-6xl p-5 mb-6 rounded-2xl border border-gray-200 bg-white flex items-center gap-4 justify-end">
                <p className="text-gray-500">সাজান</p>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                    <option value="default">
                        ডিফল্ট
                    </option>

                    <option value="low">
                        দাম কম থেকে বেশি
                    </option>

                    <option value="high">
                        দাম বেশি থেকে কম
                    </option>
                </select>
            </div>

            <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {sortedProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
                                {categoryIcon}
                            </div>

                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    {product.nameBn}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {unitBn[product.unit] || product.unit}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-end justify-between">
                            <div>
                                <p className="text-xs text-gray-500">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    ৳{toBanglaNumber(product.today)}
                                </p>
                            </div>

                            <span
                                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${product.change.dir === "up"
                                    ? "bg-red-100 text-red-600"
                                    : product.change.dir === "down"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {product.change.dir === "up" ? (
                                    <TiArrowSortedUp className="text-base" />
                                ) : product.change.dir === "down" ? (
                                    <TiArrowSortedDown className="text-base" />
                                ) : (
                                    <LuMinus className="text-base" />
                                )}

                                {toBanglaNumber(product.change.pct)}%
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductList;