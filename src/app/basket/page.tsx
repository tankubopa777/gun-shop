"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

type BasketItem = {
    id: string;
    name: string;
    detail: string;
    price: number;
};

const basketItems: BasketItem[] = [
    { id: '1', name: 'Gun name', detail: 'Gun detail', price: 9999 },
    { id: '1', name: 'Gun name', detail: 'Gun detail', price: 9999 },
    { id: '1', name: 'Gun name', detail: 'Gun detail', price: 9999 }
];

export default function Basket() {

    return (
        <div className="w-full min-h-screen bg-black text-white ">
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4"
            >
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold mb-6">My Basket</h1>
                    {basketItems.length > 0 ? (
                        <div className="w-full">
                            {basketItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between mb-4 p-4 bg-gray-700"
                                >
                                    {/* Image placeholder for the gun */}
                                    <Image src="/background/smgbg.jpeg" alt="Gun" width={100} height={100} />
                                    <div className="flex-1 mx-4">
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.detail}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="mx-2">-</button>
                                        <span>1</span>
                                        <button className="mx-2">+</button>
                                    </div>
                                    <div>
                                        <p>{item.price} Baht</p>
                                    </div>
                                </div>
                            ))}
                            <button className="px-6 py-2 bg-green-500 hover:bg-green-600 transition duration-300">
                                Check out
                            </button>
                        </div>
                    ) : (
                        <p>You have no items in your basket.</p>
                    )}
                    <Link href="/shop">
                        <div className="text-green-400 mt-4">Go back to the shop</div>
                    </Link>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}

