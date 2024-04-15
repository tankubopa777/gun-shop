'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useParams } from 'next/navigation';
import RelatedProducts from '@/app/components/RelateProduct';
import Footer from '@/app/components/Footer';

const fetchGunDetails = async (id: string) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: "M82A1",
                description: "The M82A1 is a recoil-operated, semi-automatic anti-materiel rifle developed by the American Barrett Firearms Manufacturing company. It is used by many units and armies around the world. Despite its designation as an anti-materiel rifle, it is used by some armed forces as an anti-personnel system.",
                imageUrl: "/path-to-gun-image.jpg"
            });
        }, 500);
    });
};

export default function GunDetail() {
    const [gunDetails, setGunDetails] = useState<any>(null);
    const params = useParams();
    const id = params.id ? params.id.toString() : '';

    useEffect(() => {
        if (id) {
            fetchGunDetails(id).then(details => {
                setGunDetails(details);
            });
        }
    }, [id]);

    if (!gunDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-black'>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4 "
            >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Image
                        src={"/sniper_rifle.jpg"}
                        alt={gunDetails.name}
                        width={500}
                        height={500}
                        className="rounded-md"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-white">{gunDetails.name}</h1>
                        <p className="text-lg text-white mt-2">{gunDetails.description}</p>
                        <div className="flex items-center mt-4">
                            <div className="text-xl font-semibold text-white">${gunDetails.price}</div>
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
                <div className='w-full'>
                    <RelatedProducts />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}
