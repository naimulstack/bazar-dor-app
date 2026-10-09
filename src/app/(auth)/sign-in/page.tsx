"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";

const SignInPage = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
    };

    return (
        <div className="flex flex-col justify-center items-center bg-[#f4f7f4] my-8">
            <Form className="w-full max-w-md p-4" onSubmit={onSubmit}>
                <div className="mx-auto text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        সাইন ইন
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full">
                    <div className="flex flex-col gap-4">
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-sm font-medium text-gray-700">
                                ইমেইল
                            </Label>
                            <Input placeholder="you@example.com" className="mt-1" />
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
                            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="mt-1" />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl shadow-md transition-all"
                        >
                            সাইন ইন
                        </Button>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="px-3 text-sm text-gray-700">অথবা</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 text-black bg-white"
                        >
                            <FcGoogle />
                            Google দিয়ে চালিয়ে যান
                        </Button>
                        <Button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 text-black bg-white"
                        >
                            <FaGithub />
                            GitHub দিয়ে চালিয়ে যান
                        </Button>
                    </div>

                    <div className="text-center mt-6 text-sm text-gray-600">
                        অ্যাকাউন্ট নেই? <Link href="/sign-up" className="text-[#00873e] font-semibold hover:underline">সাইন আপ করুন</Link>
                    </div>
                </div>
            </Form>

            <div className="mt-6 text-center">
                <Link href="/" className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <GoArrowLeft /> হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;