import Image from "next/image";
import NavLinks from "./navlinks";
import Logo from "../../../public/Images/logo-icon.png";
import Link from "next/link";
import { connection } from "next/server";
import UserMenu from "./UserMenu";


const HeaderPage = async () => {
    await connection();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <header className="border-b border-gray-300 bg-white">
            <div className="border-b border-gray-200">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

                    <div className="flex min-w-0 items-center gap-2">
                        <Link href="/" className="shrink-0">
                            <Image
                                src={Logo}
                                width={38}
                                height={38}
                                priority
                                alt="Bazar Dor Logo"
                                className="rounded-lg bg-green-600 p-1.5"
                            />
                        </Link>

                        <div className="min-w-0">
                            <h1 className="text-base font-bold leading-5 text-gray-800 sm:text-lg">
                                বাজার দর
                            </h1>

                            <p className="truncate text-[10px] text-gray-500 sm:text-xs">
                                {date}
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center">
                        <UserMenu />
                    </div>

                </div>
            </div>

            <NavLinks />
        </header>
    );
};

export default HeaderPage;
