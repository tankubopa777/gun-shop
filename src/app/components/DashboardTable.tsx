"use client";
import React, { useState, useEffect} from 'react';

export default function DashboardTable({ orders }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        console.log("Current Page:", currentPage);
        console.log("Displayed Orders:", currentOrders.length);
    }, [currentPage, currentOrders]);  // Add dependencies here

    const handleNextPage = () => {
        if (currentPage < Math.ceil(orders.length / itemsPerPage)) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="bg-gray-900 rounded-lg shadow-sm w-full border-gray-800 border">
            {/* <div className="px-6 py-4 flex items-center justify-between border-b  border-gray-800"> */}
                {/* <div className="flex items-center space-x-3">
                    <SearchIcon className="h-5 w-5 " />
                    <input className="border-none focus:ring-0 text-sm bg-gray-900" placeholder="Search orders..." type="text" />
                </div> */}
            {/* </div> */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-thin text-white">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-white text-sm font-thin">
                            <th className="px-4 py-3 text-left font-thin">Product Name</th>
                            <th className="px-4 py-3 text-left font-thin">Customer</th>
                            <th className="px-4 py-3 text-left font-thin">Quantity</th>
                            <th className="px-4 py-3 text-right font-thin">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800">
                                <td className="px-4 py-4 font-thin">{order.product_name}</td>
                                <td className="px-4 py-4 font-thin">{order.username}</td>
                                <td className="px-4 py-4 font-thin">{order.order_quantity}</td>
                                <td className="px-4 py-4 text-right font-thin">${order.product_price * order.order_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 flex justify-between">
                {/* <button 
                    onClick={handlePrevPage}
                    className="text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button 
                    onClick={handleNextPage}
                    className="text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                    disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
                >
                    Next
                </button> */}
            </div>
        </div>
    );
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



