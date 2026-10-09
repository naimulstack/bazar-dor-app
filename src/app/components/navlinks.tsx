import Link from "next/link";

interface INav {
  slug: string;
  nameBn: string;
  icon: string;
  id: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: INav[] = await res.json();

  return (
    <nav className="mx-auto max-w-6xl overflow-x-auto px-4">
      <div className="flex w-max gap-6 py-3">
        {data.map((nav) => (
          <Link
            key={nav.id}
            href={`/category/${nav.slug}`}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-100 hover:text-green-700"
          >
            {nav.icon} {nav.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;