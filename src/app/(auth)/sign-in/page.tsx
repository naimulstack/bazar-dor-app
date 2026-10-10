"use client";

import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { signIn } from "@/lib/auth-client";
import { ToastContainer, Bounce, toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInPage = () => {

    const onSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/?login=success",
        });

        if (error) {
            toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!");
        } else {
            toast.success("সফলভাবে Sign In হয়েছে!");
        }
    };

    const githubSignIn = async () => {
        sessionStorage.setItem("oauth-success", "true");

        const { error } = await signIn.social({
            provider: "github",
            callbackURL: "/",
        });

        if (error) {
            sessionStorage.removeItem("oauth-success");
            toast.error("GitHub দিয়ে Sign In করা যায়নি!");
        }
    };

    const googleSignIn = async () => {
        sessionStorage.setItem("oauth-success", "true");

        const { error } = await signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            sessionStorage.removeItem("oauth-success");
            toast.error("Google দিয়ে Sign In করা যায়নি!");
        }
    };

    return (

        <div className="my-4 flex h-auto flex-col items-center justify-center bg-[#f4f7f4] px-3 py-6 sm:my-6 sm:px-6 sm:py-8">

            <ToastContainer
                position="top-right"
                autoClose={3000}
                transition={Bounce}
            />

            <Form
                className="w-full max-w-md"
                onSubmit={onSubmit}
            >
                <div className="mx-auto mb-5 w-full px-1 text-center sm:mb-6">
                    <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                        সাইন ইন
                    </h1>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
                        অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8">

                    <div className="flex flex-col gap-4">

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                                ) {
                                    return "Please enter a valid email address";
                                }

                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-gray-700">
                                ইমেইল
                            </Label>

                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1 w-full"
                            />

                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }

                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }

                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }

                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-gray-700">
                                পাসওয়ার্ড
                            </Label>

                            <Input
                                name="password"
                                type="password"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className="mt-1 w-full"
                            />

                            <FieldError />
                        </TextField>

                    </div>

                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full rounded-xl bg-green-600 py-3 font-medium text-white shadow-sm transition-colors hover:bg-green-700"
                        >
                            সাইন ইন
                        </Button>
                    </div>

                    <div className="my-5 flex items-center sm:my-6">
                        <div className="flex-grow border-t border-gray-200" />

                        <span className="px-3 text-sm text-gray-500">
                            অথবা
                        </span>

                        <div className="flex-grow border-t border-gray-200" />
                    </div>

                    <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">

                        <Button
                            onClick={googleSignIn}
                            type="button"
                            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                        >
                            <FcGoogle className="shrink-0 text-lg" />
                            <span>Google দিয়ে চালিয়ে যান</span>
                        </Button>

                        <Button
                            onClick={githubSignIn}
                            type="button"
                            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                        >
                            <FaGithub className="shrink-0 text-lg" />
                            <span>GitHub দিয়ে চালিয়ে যান</span>
                        </Button>

                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-1 text-center text-sm text-gray-600">
                        <span>অ্যাকাউন্ট নেই?</span>

                        <Link
                            href="/sign-up"
                            className="font-semibold text-[#00873e] hover:underline"
                        >
                            সাইন আপ করুন
                        </Link>
                    </div>

                </div>
            </Form>

            <div className="mt-5 text-center sm:mt-6">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                    <GoArrowLeft />
                    হোম পেজে ফিরে যান
                </Link>
            </div>

        </div>

    );
};

export default SignInPage;
