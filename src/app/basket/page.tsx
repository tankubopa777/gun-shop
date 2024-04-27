"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AiFillDelete } from 'react-icons/ai';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type BasketItem = {
    id: string;
    name: string;
    detail: string;
    price: number;
    quantity: number;
};

export default function Basket() {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const router = useRouter();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const response = await fetch('http://localhost:8002/order/getBasketByToken', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch basket items');
                }

                const data = await response.json();
                const items = data.Products.map(product => ({
                    id: String(product.product_id),
                    cart_id : String(product.id),
                    name: product.product_name,
                    detail: '',
                    price: product.product_price,
                    quantity: product.order_quantity
                }));

                setBasketItems(items);
            } catch (error) {
                console.error('Error fetching basket items:', error);
            }
        };

        fetchBasket();
    }, []);

    const handleIncrement = (id: string) => {
        const newItems = basketItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setBasketItems(newItems);
    };

    const handleDecrement = (id: string) => {
        const newItems = basketItems.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setBasketItems(newItems);
    };

    const handleDelete = async (cart_id: string) => {
        if (!token) {
            alert('You must be logged in to perform this action.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8002/order/deleteBasket?id=${cart_id}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error('Failed to delete item: ' + message);
            }

            const remainingItems = basketItems.filter(item => item.cart_id !== cart_id);
            setBasketItems(remainingItems);
            alert('Item deleted successfully!');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert(error.message);
        }
    };

    return (
        <div className="w-full min-h-screen bg-black text-white">
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
                                    className="flex items-center justify-between mb-4 p-4 bg-gray-900"
                                >
                                    <Image src="/background/smgbg.jpeg" alt="Gun" width={100} height={100} />
                                    <div className="flex-1 mx-4">
                                        <p className="font-bold">{item.name}</p>
                                        <p>{item.detail}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button className="mx-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleDecrement(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button className="mx-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => handleIncrement(item.id)}>+</button>
                                    </div>
                                    <div>
                                        <p>{item.price} Baht</p>
                                    </div>
                                    <button onClick={() => handleDelete(item.cart_id)} className="text-red-500 hover:text-red-700">
                                        <AiFillDelete size={24} />
                                    </button>
                                </div>
                            ))}
                            <button 
                            onClick={() => router.push('../payment')}
                            className="px-6 py-2 bg-green-500 hover:bg-green-600 transition duration-300">
                                Check out
                            </button>
                        </div>
                    ) : (
                        <p>You have no items in your basket.</p>
                    )}
                    <Link href="/gun">
                        <div className="text-green-400 mt-4">Go back to the shop</div>
                    </Link>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}
