
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

                <h1 className="text-8xl font-extrabold text-green-600">
                    ৪০৪
                </h1>

                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    দুঃখিত! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                </h2>

                <p className="mt-3 leading-7 text-gray-500">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি খুঁজে পাওয়া যাচ্ছে না।
                    অনুগ্রহ করে সঠিক ঠিকানা দিয়ে আবার চেষ্টা করুন।
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                    হোম পেজে ফিরে যান
                </Link>

            </div>
        </main>
    );
}
