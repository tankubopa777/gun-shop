// Login page
"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Transition from '../components/Transition';

export default function Login() {
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

    return (
        <div className="w-full h-screen bg-black">
            <Transition />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50"
            >
                <div className="grid md:grid-cols-2 gap-8 items-center ">
                    <Image
                        src={"/background/gun-logo.png"}
                        alt="Login"
                        width={500}
                        height={500}
                    />
                    <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={control}
                        variants={fadeInClient}
                        className="flex flex-col justify-center "
                    >
                        <h1 className="text-4xl font-bold text-white">Login</h1>
                        <p className="text-gray-300">Login to your account to access your profile.</p>
                        {/* Username input */}
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-gray-800 text-white p-2 my-4"
                        />

                        {/* Password input */}
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-800 text-white p-2 my-4"
                        />

                        <Link href="/dashboard">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Login</button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}