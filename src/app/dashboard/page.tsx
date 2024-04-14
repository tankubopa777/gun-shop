"use client";
import React from 'react';
import Image from "next/image";
import Navbar from "../components/Navbar";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

import Footer from '../components/Footer';

export default function Home() {
    const control = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    console.log(entry.isIntersecting);
                    if (entry.isIntersecting) {
                        control.start("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        } else {
            console.log("ref not attached"); // Debug: Check if the ref is attached
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [control]);

    const fadeInClient = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };


    const fadeIn = (direction: string, delay: number) => {
        return {
            hidden: {
                y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
                opacity: 0,
                x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
                transition: {
                    type: 'tween',
                    duration: 1.5,
                    delay: delay
                }
            },
            show: {
                y: 0,
                opacity: 1,
                x: 0,
                transition: {
                    type: 'tween',
                    duration: 1.5,
                    delay: delay
                }
            }
        };
    };

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
                        alt="Home"
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
                        <h1 className="text-4xl font-bold text-white">Home</h1>
                        <p className="text-gray-300">Welcome to the gun store.</p>
                    </motion.div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}
