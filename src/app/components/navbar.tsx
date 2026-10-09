"use client";

import Image from "next/image";
import NavLinks from "./navlinks";
import Logo from "../../../public/Images/logo-icon.png";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeaderPage = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });

        setDate(today);
    }, []);

    return (
        <header className="border-b border-gray-300 bg-white">
            <div className="border-b border-gray-200">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-0">

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

                            <p className="truncate text-[8px] text-gray-500 sm:text-[9px]">
                                {date}
                            </p>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                        <Link
                            href="/sign-in"
                            className="text-xs font-medium text-gray-700 transition hover:text-green-600 sm:text-sm"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 sm:px-4 sm:text-sm"
                        >
                            সাইন আপ
                        </Link>
                    </div>

                </div>
            </div>
            <NavLinks />
        </header>
    );
};

export default HeaderPage;
