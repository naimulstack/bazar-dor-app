const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center md:flex-row md:justify-between md:gap-4 md:text-left">
                <div>
                    <p className="text-sm leading-6 text-gray-700 sm:text-base">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                </div>

                <div>
                    <p className="text-xs leading-5 text-gray-500 sm:text-sm">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;