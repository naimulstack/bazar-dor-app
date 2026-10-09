import CategoryLink from "../../app/components/CategoryLink"

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

return ( <nav className="mx-auto max-w-6xl overflow-x-auto px-4"> <div className="flex w-max gap-6 py-3">
{data.map((nav) => ( <CategoryLink key={nav.id} nav={nav} />
))} </div> </nav>
);
};

export default NavLinks;
