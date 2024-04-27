"use client";
import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Cursor from '../components/Cursor';
import AddressForm from '../components/AddressForm';
import PaymentSummary from '../components/PaymentSummary';
import Footer from '../components/Footer';


export default function Payment() {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const control = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchBasket = async () => {
            try {
                const response = await fetch('http://localhost:8002/order/getBasketByToken', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch basket items');
                }

                const data = await response.json();
                const items = data.Products.map(product => ({
                    id: String(product.product_id),
                    cart_id : String(product.id),
                    name: product.product_name,
                    detail: '',
                    price: product.product_price,
                    quantity: product.order_quantity
                }));

                setBasketItems(items);
            } catch (error) {
                console.error('Error fetching basket items:', error);
            }
        };

        fetchBasket();
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
        <div className='bg-black'>
            <Cursor />
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AddressForm />
                    <PaymentSummary basketItems={basketItems} />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}