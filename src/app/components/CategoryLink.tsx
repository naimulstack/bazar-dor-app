"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INav {
slug: string;
nameBn: string;
icon: string;
id: string;
}

const CategoryLink = ({ nav }: { nav: INav }) => {
const pathname = usePathname();

const isActive = pathname === `/category/${nav.slug}`;

return (
<Link
href={`/category/${nav.slug}`}
className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-green-600 text-white"
          : "text-gray-700 hover:bg-green-100 hover:text-green-700"
      }`}
>
{nav.icon} {nav.nameBn} </Link>
);
};

export default CategoryLink;
