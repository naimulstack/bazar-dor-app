import { TiArrowSortedUp, TiArrowSortedDown, } from "react-icons/ti";
import { LuMinus } from "react-icons/lu";

interface CategoryProductProps {
    params: Promise<{
        categoryId: string;
    }>;
}

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

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const CategoryProduct = async ({
    params,
}: CategoryProductProps) => {
    const { categoryId } = await params;

    // Products API
    const productRes = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`
    );

    const data: Product[] = await productRes.json();

    // Categories API
    const categoryRes = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/categories"
    );

    const categories: Category[] = await categoryRes.json();

    // Find current category
    const category = categories.find(
        (item) => item.slug === categoryId
    );

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
        <main className="min-h-screen bg-[#f1f6f2]">
            <div className="mx-auto max-w-6xl px-4 py-6">

                <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                            {category?.icon}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {category?.nameBn || categoryId}
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                {data.length}টি পণ্য আজকের দাম ও পরিবর্তন
                            </p>
                        </div>

                    </div>
                </div>

                <p className="mb-3 text-sm text-gray-500">
                    মোট {data.length}টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                                    {category?.icon}
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
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
};

export default CategoryProduct;