"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AiOutlineDown } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";




const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsOpen(false);
        router.push("/sign-in");
    };

    if (isPending) {
        return <div className="h-9 w-24 animate-pulse rounded bg-gray-100" />;
    }

    const user = session?.user;

    if (!user) {
        return (
            <div className="flex items-center gap-3">
                <Link href="/sign-in" className="text-sm text-gray-700 hover:text-green-600">
                    সাইন ইন
                </Link>
                <Link href="/sign-up" className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return (
        <div className="relative rounded-2xl border border-gray-400">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-2xl p-2 hover:bg-green-100 cursor-pointer"
            >
                {user.image ? (
                    <Image
                        src={user.image}
                        alt={user.name}
                        width={100}
                        height={100}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                        {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                )}

                <span className="max-w-28 truncate text-sm text-gray-800">
                    {user.name}
                </span>
                <span className="text-md"><AiOutlineDown />
                </span>
            </button>

            {isOpen && (
                <>
                    <button
                        aria-label="Close menu"
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                        <p className="truncate text-sm font-semibold text-gray-800">
                            {user.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                            {user.email}
                        </p>

                        <hr className="my-3" />

                        <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        > <span className="flex gap-2 items-center">
                                <IoMdPerson  className="text-xl"/>
                                আমার প্রোফাইল
                            </span>
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="mt-1 w-full rounded-md px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                            <span className="flex gap-2 items-center">
                                <BsArrowReturnRight className="text-xl"/>
                                সাইন আউট
                            </span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserMenu;
