// Payment page
"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Cursor from '../components/Cursor';


export default function Payment() {
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

        // Return a cleanup function that does not return any value
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            // No return statement needed, implicit return undefined (void)
        };
    }, [control]);


    const fadeInClient = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div>
            <Cursor />
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4"
            >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Image
                        src={"/background/sniper_rifle.jpg"}
                        alt="Payment"
                        width={500}
                        height={500}
                        className="rounded-md"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-white">Payment</h1>
                        <p className="text-lg text-white mt-2">Payment page</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}