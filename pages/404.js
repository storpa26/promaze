import React from "react";
import Link from "next/link";

const FourOhFour = () => {
    return (
        <div className="h-screen flex flex-col justify-center">
            <section className="bg-websiteWhite">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-500">
                            404
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
                            Something&apos;s missing.
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                            Sorry, we can&apos;t find that page. You&apos;ll
                            find lots to explore on the home page.{" "}
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FourOhFour;
