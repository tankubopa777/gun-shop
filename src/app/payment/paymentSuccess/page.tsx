"use client";
import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Cursor from '../../components/Cursor';
import { useRouter } from 'next/navigation';
import Transition from '../../components/Transition';

export default function PaymentSuccess() {
    const router = useRouter();
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className='bg-black text-white'>
            <Transition />
            <Cursor />
            <Navbar />
            
            {/* Success Message Section */}
            <motion.div
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center h-screen"
            >
                {/* <Image
                    src="/background/confirmation.jpg"
                    alt="Payment Success"
                    layout='fill'
                    objectFit='cover'
                    className="z-0"
                /> */}
                <div className="absolute z-10 p-5 text-center">
                    <motion.h1
                        variants={fadeIn}
                        className="font-semibold text-6xl mb-4"
                    >
                        Payment Successful!
                    </motion.h1>
                    <motion.p
                        variants={fadeIn}
                        className="text-xl"
                    >
                        <div  className="mb-5" > 
                        Thank you for your purchase. Gun will sent to you soon.
                        </div>
                        <button 
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-2'
                        onClick={() => router.push('/productDashboard')}>
                        Order History
                    </button>
                    <button 
                    className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mx-2'
                    onClick={() => router.push('/gun')}>
                        Continue Shopping
                    </button>
                    </motion.p>
                </div>
                
            </motion.div>

           

            <Footer />
        </div>
    );
}

