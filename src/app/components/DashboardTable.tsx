import React from 'react';

export default function DashboardTable() {
    return (
        <div className="bg-gray-900 rounded-lg shadow-sm w-full border-red-600 border">
            <div className="px-6 py-4 flex items-center justify-between border-b  border-red-600">
                <div className="flex items-center space-x-3">
                    <SearchIcon className="h-5 w-5 " />
                    <input className="border-none focus:ring-0 text-sm bg-gray-900" placeholder="Search orders..." type="text" />
                </div>
            </div>
            <div className="px-6 py-4 border-b border-red-600">
                <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-grey-900 text-white text-sm font-medium">
                            <th className="px-4 py-3 text-left">Order</th>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="px-4 py-4 flex items-center space-x-3">
                                <PackageIcon className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="font-medium text-white">INV-00234</p>
                                    <p className="text-sm text-gray-500">Laptop Charger</p>
                                </div>
                            </td>
                            <td className="px-4 py-4">
                                <p className="font-medium text-white">John Doe</p>
                                <p className="text-sm text-gray-500">john@example.com</p>
                            </td>
                            <td className="px-4 py-4">
                                <p className="font-medium text-white">Aug 24, 2023</p>
                                <p className="text-sm text-gray-500">10:34 AM</p>
                            </td>
                            <td className="px-4 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Delivered
                                </span>
                            </td>
                            <td className="px-4 py-4 text-right">
                                <p className="font-medium text-white">$49.99</p>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

function PackageIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}

function SearchIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}



