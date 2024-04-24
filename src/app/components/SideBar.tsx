import React from "react";
import Link from "next/link";
import router from 'next/router';

export function SideBar() {
    // logout popup state
    const [openLogout, setOpenLogout] = React.useState(false);

    return (
        <div className="h-full w-full bg-violet-800 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-l-none border-white">
            <div className="mb-2 p-4">
                <div className=" text-gray-200 ">
                    Dashboard
                </div>
            </div>
            <div className=" space-y-3">
                {/* Home */}
                <Link href="../dashboard">
                    <div className="text-gray-100 bg-blue-900">
                        <div className=" mr-2">
                            <div className="h-5 w-5" />
                        </div>
                        Home
                    </div>
                </Link>
                {/* Profile Setting */}
                <Link href="../dashboard/profileSetting">
                    <div className="text-gray-100 bg-blue-900 ">
                        <div className=" mr-2">
                            <div className="h-5 w-5" />
                        </div>
                        Profile Setting
                    </div>
                </Link>

                {/* Pateint History */}
                <Link href="../dashboard/historyDashboard">
                    <div className="text-gray-100 bg-blue-900 ">
                        <div className=" mr-2">
                            <div className="h-5 w-5" />
                        </div>
                        Pateint History
                    </div>
                </Link>

                <button onClick={() => setOpenLogout(true)}>
                    <div className="text-gray-100 bg-blue-900 ">
                        <div className=" mr-2">
                            <div className="h-5 w-5" />
                        </div>
                        Log Out
                    </div>
                </button>



            </div>
        </div>
    );
}