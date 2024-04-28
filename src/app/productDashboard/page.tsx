"use client";
import React, { useEffect, useRef, useState} from 'react';
import { motion, useAnimation } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { SideBar } from '../components/SideBar';
import DashboardTable from '../components/DashboardTable';

export default function ProductDashboard() {
    const control = useAnimation();
    const ref = useRef(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token'); // Ideally, handle token more securely
            try {
                const response = await fetch('http://localhost:8002/order/getOrderByToken', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                const reversedOrders = data.Products.reverse();
                setOrders(reversedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, observer) => {
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


    return (
        <div className="w-full h-screen bg-black flex flex-row">
            <SideBar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="mx-auto  p-4 w-full h-full flex flex-col justify-center items-center bg-gray-900 bg-opacity-50"
            >
                <DashboardTable orders={orders} />
            </motion.div>
        </div>
    );
}