"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { BsArrowReturnRight } from "react-icons/bs";

export default function ProfilePage() {
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

    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
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

        try {
            const { error } = await authClient.updateUser({
                name: newName,
            });

            if (error) {
                toast.error(
                    error.message || "নাম পরিবর্তন করা যায়নি।"
                );
                return;
            }

            setName(newName);
            setEditName(newName);
            setIsEditing(false);

            toast.success("আপনার নাম সফলভাবে পরিবর্তন হয়েছে।");
        } catch {
            toast.error("নাম পরিবর্তন হয়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/sign-in");
                        router.refresh();
                    },
                },
            });
        } catch {
            toast.error("Sign out করা যায়নি। আবার চেষ্টা করুন।");
        }
    };

    if (isPending) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
                <p className="text-gray-600">
                    প্রোফাইল লোড হচ্ছে...
                </p>
            </main>
        );
    }

    if (!session?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0] px-4">
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800">
                        লগইন করা নেই
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        প্রোফাইল দেখতে প্রথমে লগইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-5 inline-block rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
                    >
                        Sign In
                    </Link>
                </div>
            </main>
        );
    }

    const initial = name.trim().charAt(0).toUpperCase() || "U";

    return (
        <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                <section className="mb-4 flex items-center gap-4 rounded-xl border border-gray-200 bg-white/80 p-4 sm:p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-800">
                        {initial}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="truncate font-semibold text-gray-800">
                            {name || "আপনার নাম"}
                        </h2>

                        <p className="mt-1 break-all text-sm text-gray-500">
                            {email}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="shrink-0 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 sm:text-sm"
                    >
                        <span className="flex gap-2 items-center">
                            <BsArrowReturnRight className="text-xl" />
                            সাইন আউট
                        </span>
                    </button>
                </section>

                <section className="rounded-xl border border-gray-200 bg-white/80 p-5 sm:p-7">
                    <div className="mb-7 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-800">
                            তথ্য
                        </h2>

                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="text-sm font-medium text-green-700 hover:text-green-900"
                            >
                                ✎ নাম পরিবর্তন
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleUpdate}>
                        <label
                            htmlFor="profile-name"
                            className="mb-2 block text-sm font-medium text-gray-700"
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
                            className={`w-full rounded-lg border px-3 py-3 text-sm text-gray-800 outline-none transition ${isEditing
                                    ? "border-green-500 bg-white focus:ring-2 focus:ring-green-100"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                        />

                        <label
                            htmlFor="profile-email"
                            className="mb-2 mt-5 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="profile-email"
                            type="email"
                            value={email}
                            readOnly
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-500 outline-none"
                        />

                        {isEditing && (
                            <div className="mt-5 flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 rounded-lg bg-green-700 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSaving
                                        ? "সেভ হচ্ছে..."
                                        : "আপডেট করুন"}
                                </button>

                                <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={() => {
                                        setEditName(name);
                                        setIsEditing(false);
                                    }}
                                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
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

