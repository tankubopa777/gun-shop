"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from "next/image";
import { motion, useAnimation } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Cursor from '../components/Cursor';
import Transition from '../components/Transition';

export default function Gun() {
    const control = useAnimation();
    const ref = useRef(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8001/product/allProduct', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && Array.isArray(data.Products)) {
                    const formattedData = data.Products.map(product => ({
                        id: product.id,
                        name: product.product_name,
                        description: product.product_description,
                        priceRange: `$${product.product_price}`,
                        image: product.product_image || '/background/sniper_rifle.jpg', 
                        rating: product.reviews ? product.reviews.average : 4 
                    }));
                    setProducts(formattedData);
                } else {
                    console.error('Expected an array of products under "Products" key, but received:', data);
                }
            })
            .catch(error => console.error('Error loading products:', error));
    }, []);

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
        <div className='bg-black'>
            <Transition />
            <Cursor />
            <Navbar />
            <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                className="relative flex flex-col items-center justify-center h-screen">
                <Image
                    src="/background/gun_weapon.jpg"
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

            <div className='container mx-auto mt-10 p-4'>
                <motion.div
                    variants={fadeInClient}
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

