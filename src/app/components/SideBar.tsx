"use client";
import React from "react";
import Link from "next/link";
import router from 'next/router';

export function SideBar() {
    // logout popup state
    const [openLogout, setOpenLogout] = React.useState(false);

    return (
        <div className="h-full w-full bg-gray-900 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-l-none border-white">
            <div className="mb-2 p-4">
                <div className=" text-gray-200 ">
                    Dashboard
                </div>
            </div>
            <div className=" space-y-3">
                {/* Home */}
                <Link href="../dashboard">
                    <div className="text-gray-100 bg-black rounded-full h-full mt-5 ">
                        <h1 className="items-center place-self-center h-12 flex justify-center"> Dashboard </h1>
                    </div>
                </Link>
                {/* Profile */}
                <Link href="../dashboard">
                    <div className="text-gray-100 bg-black rounded-full h-full mt-5 ">
                        <h1 className="items-center place-self-center h-12 flex justify-center"> Profile </h1>
                    </div>
                </Link>

                <Link href="../login">
                    <div className="text-gray-100 bg-black rounded-full h-full mt-5 ">
                        <h1 className="items-center place-self-center h-12 flex justify-center"> Logout </h1>
                    </div>
                </Link>
            </div>
        </div>
    );
}