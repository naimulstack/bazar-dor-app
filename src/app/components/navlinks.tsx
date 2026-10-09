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
    <div className="flex gap-6 mx-auto max-w-6xl py-3">
      {data.map((nav) => (
        <Link key={nav.id} href={nav.slug}>
          {nav.icon} {nav.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;

