"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { BsArrowReturnRight } from "react-icons/bs";

const ProfilePage = () => {

    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editName, setEditName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setEditName(session.user.name || "");
            setEmail(session.user.email || "");
        }
    }, [session]);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newName = editName.trim();

        if (!newName) {
            toast.error("নাম লিখুন।");
            return;
        }

        if (newName === name) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);

        const { error } = await authClient.updateUser({
            name: newName,
        });

        if (error) {
            toast.error(error.message || "নাম পরিবর্তন করা যায়নি।");
        } else {
            setName(newName);
            setEditName(newName);
            setIsEditing(false);
            toast.success("আপনার নাম সফলভাবে পরিবর্তন হয়েছে।");
        }

        setIsSaving(false);
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                    router.refresh();
                },
            },
        });
    };

    if (isPending) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4">
                <p className="text-center text-sm text-gray-600 sm:text-base">
                    প্রোফাইল লোড হচ্ছে...
                </p>
            </main>
        );
    }

    if (!session?.user) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4 py-8">
                <div className="w-full max-w-sm rounded-2xl bg-white p-5 text-center shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                        লগইন করা নেই
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        প্রোফাইল দেখতে প্রথমে লগইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800"
                    >
                        Sign In
                    </Link>
                </div>
            </main>
        );
    }

    const initial = name.trim().charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-3 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-xl">
                <div className="mb-5 sm:mb-6">
                    <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <section className="mb-4 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                    <div className="flex min-w-0 items-center gap-3 sm:flex-1 sm:gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-800 sm:h-14 sm:w-14 sm:text-2xl">
                            {initial}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                                {name || "আপনার নাম"}
                            </h2>

                            <p className="mt-1 break-all text-xs leading-5 text-gray-500 sm:text-sm">
                                {email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex min-h-10 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 sm:w-auto"
                    >
                        <BsArrowReturnRight className="text-lg" />
                        সাইন আউট
                    </button>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-7">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 sm:mb-7">
                        <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
                            অ্যাকাউন্টের তথ্য
                        </h2>

                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditName(name);
                                    setIsEditing(true);
                                }}
                                className="rounded-md py-1 text-xs font-medium text-green-700 transition hover:text-green-900 sm:text-sm"
                            >
                                ✎ নাম পরিবর্তন
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleUpdate}>
                        <label
                            htmlFor="profile-name"
                            className="mb-2 block text-xs font-medium text-gray-700 sm:text-sm"
                        >
                            নাম
                        </label>

                        <input
                            id="profile-name"
                            type="text"
                            value={isEditing ? editName : name}
                            onChange={(e) => setEditName(e.target.value)}
                            readOnly={!isEditing}
                            placeholder="আপনার নাম লিখুন"
                            className={`min-h-11 w-full rounded-lg border px-3 py-3 text-sm text-gray-800 outline-none transition ${isEditing
                                    ? "border-green-500 bg-white focus:ring-2 focus:ring-green-100"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                        />

                        <label
                            htmlFor="profile-email"
                            className="mb-2 mt-5 block text-xs font-medium text-gray-700 sm:text-sm"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="profile-email"
                            type="email"
                            value={email}
                            readOnly
                            className="min-h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-500 outline-none"
                        />

                        {isEditing && (
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving ? "সেভ হচ্ছে..." : "আপডেট করুন"}
                                </button>

                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => {
                                        setEditName(name);
                                        setIsEditing(false);
                                    }}
                                    className="min-h-11 rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:flex-none"
                                >
                                    বাতিল
                                </button>
                            </div>
                        )}
                    </form>
                </section>
            </div>
        </main>
    );
}

export default ProfilePage;