"use client";

import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { signIn, signUp, authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const SignUpPage = () => {

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        if (data.password !== data.confirmPassword) {
            toast.error("পাসওয়ার্ড মিলছে না!");
            return;
        }

        const { data: signUpData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        });

        if (error) {
            toast.error("সফলভাবে Sign Up হয়নি");
        } else {
            toast.success("সফলভাবে Sign Up হয়েছে!");
            await authClient.getSession();
            router.replace("/");
            router.refresh();
        }
    };


    const githubSignIn = async () => {
        sessionStorage.setItem("oauth-success", "true");

        await signIn.social({
            provider: "github",
            callbackURL: "/",
            errorCallbackURL: "/sign-in",
        });
    };

    const googleSignIn = async () => {
        sessionStorage.setItem("oauth-success", "true");

        await signIn.social({
            provider: "google",
            callbackURL: "/",
            errorCallbackURL: "/sign-in",
        });
    };

    return (
        <div className="my-2 flex h-auto items-start justify-center bg-[#f4f7f4] px-3 py-6 sm:px-6 sm:py-8 md:items-center">

            <Form
                className="w-full max-w-md"
                onSubmit={onSubmit}
            >
                <Fieldset>

                    <div className="mx-auto mb-5 w-full px-1 text-center sm:mb-6">
                        <Fieldset.Legend className="text-xl font-bold text-gray-800 sm:text-2xl">
                            অ্যাকাউন্ট তৈরি করুন
                        </Fieldset.Legend>

                        <Description className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                        </Description>
                    </div>

                    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8">

                        <FieldGroup className="space-y-4">

                            {/* Name */}
                            <TextField
                                isRequired
                                name="name"
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Name must be at least 3 characters";
                                    }

                                    return null;
                                }}
                            >
                                <Label className="text-sm font-medium text-gray-700">
                                    নাম
                                </Label>

                                <Input
                                    placeholder="যেমন: রহিম উদ্দিন"
                                    className="mt-1 w-full"
                                />

                                <FieldError />
                            </TextField>

                            {/* Email */}
                            <TextField
                                isRequired
                                name="email"
                                type="email"
                            >
                                <Label className="text-sm font-medium text-gray-700">
                                    ইমেইল
                                </Label>

                                <Input
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
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    className="mt-1 w-full"
                                />

                                <FieldError />
                            </TextField>

                            <TextField
                                isRequired
                                name="confirmPassword"
                                type="password"
                            >
                                <Label className="text-sm font-medium text-gray-700">
                                    পাসওয়ার্ড নিশ্চিত করুন
                                </Label>

                                <Input
                                    placeholder="আবার লিখুন"
                                    className="mt-1 w-full"
                                />

                                <FieldError />
                            </TextField>

                        </FieldGroup>

                        <Fieldset.Actions className="mt-6 flex flex-col gap-3">

                            <Button
                                type="submit"
                                className="w-full rounded-xl bg-green-600 py-3 font-medium text-white shadow-sm transition-colors hover:bg-green-700"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </Button>

                        </Fieldset.Actions>

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
                            <span>অ্যাকাউন্ট আছে?</span>

                            <Link
                                href="/sign-in"
                                className="font-semibold text-green-600 hover:underline"
                            >
                                সাইন ইন করুন
                            </Link>
                        </div>

                    </div>

                    <div className="mt-5 text-center sm:mt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <GoArrowLeft />
                            হোম পেজে ফিরে যান
                        </Link>
                    </div>

                </Fieldset>
            </Form>
        </div>
    );
};

export default SignUpPage;