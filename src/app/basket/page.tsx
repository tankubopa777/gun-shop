// basket page
"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Basket() {
    const control = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        control.start("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [control]);

    const fadeInClient = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    // Product data could be fetched from an API or defined as a constant

    return (
        <div className="w-full h-screen">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50"
            >
                <div className="grid md:grid-cols-2 gap-8 items-center ">
                    <Image
                        src={"/gun-logo.png"}
                        alt="Basket"
                        width={500}
                        height={500}
                    />
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={control}
                        variants={fadeInClient}
                        className="text-white"
                    >
                        <h1 className="text-4xl font-bold">Your Basket</h1>
                        <p className="text-lg">You have no items in your basket.</p>
                        <Link href="/gun">
                            <div className="text-[#00df9a]">Go back to the shop</div>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}