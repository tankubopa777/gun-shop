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
import { useRouter } from 'next/navigation';


export default function Payment() {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [basketId, setBasketId] = useState(null);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const control = useAnimation();
    const ref = useRef(null);
    const router = useRouter();

    const submitOrders = async () => {
        if (!address || !phone) {
            alert('Please enter your address and phone number');
            return;
        }

        const token = localStorage.getItem('token'); 
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        try {
            const orderPromises = basketItems.map(item => {
                const orderDetails = {
                    product_id: parseInt(item.id),
                    name: item.name,
                    address: address, 
                    phone: phone,
                    order_quantity: item.quantity
                };
    
                return fetch('http://localhost:8002/order/buy', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(orderDetails)
                });
            });
    
            const responses = await Promise.all(orderPromises);
            const allOrdersSuccessful = responses.every(response => response.ok);
            
            if (!allOrdersSuccessful) {
                throw new Error('One or more orders failed');
            }
    
            console.log('All orders successful');
            await deleteAllBasketItems(); 
            router.push('../payment/paymentSuccess')
        } catch (error) {
            console.error('Error during order submission or basket deletion:', error);
        }
    };
    
    

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
                setBasketId(data.basketId);

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

    const deleteAllBasketItems = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to perform this action.');
            return;
        }
    
        try {
            // Map each item to a fetch promise to delete it
            const deletePromises = basketItems.map(item => {
                return fetch(`http://localhost:8002/order/deleteBasket?id=${item.cart_id}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            });
    
            // Await all fetch promises to complete
            const responses = await Promise.all(deletePromises);
            
            // Check each response for success
            const allDeletedSuccessfully = responses.every(response => response.ok);
            if (!allDeletedSuccessfully) {
                throw new Error('Failed to delete one or more basket items');
            }
    
            // Clear the basketItems from state after all items are successfully deleted
            setBasketItems([]);
            alert('payment successfully!!');
        } catch (error) {
            console.error('Error deleting basket items:', error);
            alert(error.message);
        }
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
                <AddressForm address={address} setAddress={setAddress} phone={phone} setPhone={setPhone}/>
                <PaymentSummary basketItems={basketItems} onCheckout={submitOrders} />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}