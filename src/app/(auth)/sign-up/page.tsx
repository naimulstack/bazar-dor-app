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


const SignUpPage = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        if (data.password !== data.confirmPassword) {
            alert("পাসওয়ার্ড মিলছে না!");
            return;
        }
    };

    return (
        <div className="flex justify-center items-center mt-8 bg-[#f4f7f4] my-2">
            <Form className="w-full max-w-md p-4" onSubmit={onSubmit}>
                <Fieldset>

                    <div className="mx-auto text-center">
                        <Fieldset.Legend className="text-2xl font-bold text-gray-800">
                            অ্যাকাউন্ট তৈরি করুন
                        </Fieldset.Legend>

                        <Description className="text-sm text-gray-500 mt-1">
                            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                        </Description>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                        <FieldGroup className="space-y-4">

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
                                    className="mt-1"
                                />

                                <FieldError />
                            </TextField>

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
                                    className="mt-1"
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
                                    className="mt-1"
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
                                    className="mt-1"
                                />

                                <FieldError />
                            </TextField>

                        </FieldGroup>

                        <Fieldset.Actions className="mt-6 flex flex-col gap-3">

                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl shadow-md transition-all"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </Button>

                        </Fieldset.Actions>

                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-200"></div>

                            <span className="px-3 text-sm text-gray-700">
                                অথবা
                            </span>

                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            <Button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 text-black bg-white"
                            >
                                <span>
                                    <FcGoogle />
                                </span>
                                Google দিয়ে চালিয়ে যান
                            </Button>

                            <Button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 text-black bg-white"
                            >
                                <span>
                                    <FaGithub />
                                </span>
                                GitHub দিয়ে চালিয়ে যান
                            </Button>

                        </div>

                        <div className="text-center mt-6 text-sm text-gray-600">
                            অ্যাকাউন্ট আছে?

                            <Link
                                href="/sign-in"
                                className="text-green-600 font-semibold hover:underline pl-2"
                            >
                                সাইন ইন করুন
                            </Link>
                        </div>

                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
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