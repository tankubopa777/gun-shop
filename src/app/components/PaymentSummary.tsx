import React from 'react';
import Image from 'next/image';

const PaymentSummary: React.FC = () => {
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-4">Payment</h2>
            <div className="flex items-center justify-between mb-4">
                {/* Replace the src with your actual image path */}
                <Image src="/background/sniperbg.jpeg" alt="Item image" width={100} height={100} />
                <span className="text-lg">1x</span>
                <span className="text-lg">9999</span>
            </div>
            {/* ...repeat for each item... */}
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total price</span>
                <span className="text-lg font-bold">99999</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
                Check out
            </button>
        </div>
    );
};

export default PaymentSummary;
