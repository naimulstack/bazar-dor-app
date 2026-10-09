import ProductList from "./ProductList";

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

    const productRes = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`
    );
    const data: Product[] = await productRes.json();

    const categoryRes = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/categories"
    );

    if (!categoryRes.ok) {
        throw new Error("Failed to fetch categories");
    }

    const categories: Category[] = await categoryRes.json();

    const category = categories.find(
        (item) => item.slug === categoryId
    );

    return (
        <main className="min-h-screen bg-[#f1f6f2]">
            <div className="mx-auto max-w-6xl px-4 py-6">

                <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
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

                <ProductList
                    products={data}
                    categoryIcon={category?.icon}
                />

            </div>
        </main>
    );
};

export default CategoryProduct;