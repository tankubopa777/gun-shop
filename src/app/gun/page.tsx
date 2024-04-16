"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Cursor from '../components/Cursor';


export default function Gun() {
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
    const products = [
        {
            id: 'p320-nitron-compact',
            name: 'P320 9MM NITRON COMPACT',
            description: 'A compact 9MM pistol known for its versatility and reliability.',
            priceRange: '$450.00',
            image: '/sniper_rifle.jpg',
            rating: 4
        },
        {
            id: 'm60-machine-gun',
            name: 'M60 MACHINE GUN',
            description: 'A legendary machine gun with reliable performance in automatic firing.',
            priceRange: '$1,299.00 - $1,399.00',
            image: '/sniper_rifle.jpg',
            rating: 5
        },
        {
            id: 'ammo-xpert22x',
            name: 'AMMO XPERT22X',
            description: 'High-quality 22 caliber cartridges designed for precision.',
            priceRange: '$15.00 - $23.00',
            image: '/sniper_rifle.jpg',
            rating: 4
        },
        {
            id: 'bulletproof-vest',
            name: 'BULLETPROOF VEST',
            description: 'Advanced body armor offering superior protection.',
            priceRange: '$220.00 - $230.00',
            image: '/sniper_rifle.jpg',
            rating: 5
        },
        {
            id: 'luger-pistol-sp5k-pdw',
            name: 'LUGER PISTOL SP5K PDW',
            description: 'A compact and versatile PDW pistol for personal defense.',
            priceRange: '$729.00',
            image: '/sniper_rifle.jpg',
            rating: 4.5
        },
        {
            id: 'round-semi-automatic-rifle',
            name: 'ROUND SEMI AUTOMATIC RIFLE',
            description: 'A semi-automatic rifle with exceptional round accuracy.',
            priceRange: '$1,799.00',
            image: '/sniper_rifle.jpg',
            rating: 4.5
        },
        {
            id: 'p320-semi-automatic-pistol',
            name: 'P320 SEMI-AUTOMATIC PISTOL',
            description: 'A semi-automatic pistol with a modular design for custom configurations.',
            priceRange: '$845.00',
            image: '/sniper_rifle.jpg',
            rating: 5
        },
        {
            id: 'ar15-rifle-buttstock',
            name: 'AR15 RIFLE BUTTSTOCK',
            description: 'Durable and adjustable buttstock for AR15 rifles.',
            priceRange: '$99.00',
            image: '/sniper_rifle.jpg',
            rating: 4.5
        }
    ];


    return (
        <div className='bg-black'>
            <Cursor />
            <Navbar />
            <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                className="relative flex flex-col items-center justify-center h-screen">
                {/* Replace with your actual hero image path */}
                <Image
                    src="/gun_weapon.jpg"
                    alt="Gun Shop"
                    layout='fill'
                    objectFit='cover'
                    className="z-0"
                />
                <div className="absolute transform z-10 text-white text-center">
                    <h1 className="font-thin text-8xl">
                        Welcome to our Store
                    </h1>
                    <h2 className="text-7xl">
                        The best gun shop in town
                    </h2>
                </div>
            </motion.div>

            {/* Product Grid */}
            <div ref={ref} className='container mx-auto mt-10 p-4'>
                <motion.div
                    variants={fadeInClient}
                    initial="hidden"
                    animate={control}
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full'>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
