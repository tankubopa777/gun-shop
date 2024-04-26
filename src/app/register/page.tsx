"use client";
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Transition from '../components/Transition';
import RegisterComponent from '../components/RegisterComponent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="items-center h-full w-full"
            >
                <RegisterComponent />
            </motion.div>
            <Footer />
        </div>
    );
}