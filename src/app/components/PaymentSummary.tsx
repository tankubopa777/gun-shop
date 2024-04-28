"use client";
import React from 'react';
import Image from 'next/image';

const PaymentSummary = ({ basketItems = [], onCheckout }) => {
    const total = basketItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-thin mb-4">Payment</h2>
            {basketItems.map(item => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                    <div> 
                    <Image src="/background/sniperbg.jpeg" alt={item.name} width={100} height={100} />
                    <span className="text-lg">{item.product_name}x</span>
                    </div>
                    <span className="text-lg">{item.quantity}x</span>
                    <span className="text-lg">{item.price}</span>
                </div>
            ))}
            <div className="flex items-center justify-between">
                <span className="text-lg font-thin">Total price</span>
                <span className="text-lg font-thin">{total}</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-thin py-2 px-4 rounded w-full mt-4"
            onClick={onCheckout}>
                Check out
            </button>
        </div>
    );
};

export default PaymentSummary;

