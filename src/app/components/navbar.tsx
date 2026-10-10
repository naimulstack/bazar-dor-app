import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

import NavLinks from "./navlinks";
import UserMenu from "./UserMenu";
import Logo from "../../../public/Images/logo-icon.png";

const NavbarPage = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="w-full border-b border-gray-300 bg-white">

            <div className="border-b border-gray-200">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">

                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                        <Link
                            href="/"
                            className="shrink-0"
                            aria-label="বাজার দর হোম"
                        >
                            <Image
                                src={Logo}
                                width={42}
                                height={42}
                                priority
                                alt="Bazar Dor Logo"
                                className="h-9 w-9 rounded-lg bg-green-600 p-1.5 sm:h-11 sm:w-11"
                            />
                        </Link>

                        <div className="min-w-0">
                            <h1 className="text-sm font-bold leading-5 text-gray-800 sm:text-lg sm:leading-6 md:text-xl">
                                বাজার দর
                            </h1>

                            <p className="mt-0.5 text-[10px] leading-4 text-gray-500 sm:text-xs md:text-sm">
                                {date}
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-end">
                        <UserMenu />
                    </div>
                </div>
            </div>

            <NavLinks />
        </header>
    );
};

export default NavbarPage;