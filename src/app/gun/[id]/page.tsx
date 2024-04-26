'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useParams } from 'next/navigation';
import RelatedProducts from '@/app/components/RelateProduct';
import Footer from '@/app/components/Footer';
import Cursor from '@/app/components/Cursor';
import Transition from '@/app/components/Transition';
import UserReviews from '@/app/components/UserReviews';

const fetchGunDetails = async (id: string) => {
    const response = await fetch(`http://localhost:8001/product/getproductsByID/${id}?type=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch gun details');
    }
    const data = await response.json();
    return data.Product;
};

export default function GunDetail() {
    const [gunDetails, setGunDetails] = useState(null);
    const params = useParams();
    const id = params.id ? params.id.toString() : '';

    useEffect(() => {
        if (id) {
            fetchGunDetails(id)
                .then(details => {
                    setGunDetails(details);
                })
                .catch(error => {
                    console.error('Error fetching gun details:', error);
                });
        }
    }, [id]);

    if (!gunDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-black'>
            <Transition />
            <Cursor />
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4 "
            >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Image
                        src={gunDetails.product_image || "/background/sniper_rifle.jpg"}
                        alt={gunDetails.product_name}
                        width={500}
                        height={500}
                        className="rounded-md"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-white">{gunDetails.product_name}</h1>
                        <p className="text-lg text-white mt-2">{gunDetails.product_description}</p>
                        <div className="flex items-center mt-4">
                            <div className="text-xl font-semibold text-white">${gunDetails.product_price}</div>
                            {/* Placeholder for the rating component */}
                            <div className="ml-4">
                                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                            </div>
                        </div>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-8 transition-colors duration-200">
                            Buy Now
                        </button>
                        <div className="flex items-center mt-4">
                            {/* Icons for safe checkout can be added here */}
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl text-white">USER REVIEW</h2>
                </div>
                <div>
                    <div className="space-y-4 grid grid-cols-3">
                        {/* Placeholder for user reviews */}
                    </div>
                </div>
                <div className='w-full'>
                    <RelatedProducts />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}