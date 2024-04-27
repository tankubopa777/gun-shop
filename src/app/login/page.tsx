"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { motion, useAnimation } from 'framer-motion';
import Transition from '../components/Transition';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const control = useAnimation();
    const ref = useRef(null);
    const router = useRouter();

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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                console.log('Login successful:', data);
                router.push('../');
                window.location.reload();
            } else {
                throw new Error(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="w-full h-screen bg-black">
            <Navbar />
            <Transition />
            <form onSubmit={handleSubmit} className="container mx-auto my-8 p-4 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
                <div className="grid md:grid-cols-2 gap-8 items-center">
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
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                        className="flex flex-col justify-center"
                    >
                        <h1 className="text-4xl font-bold text-white">Login</h1>
                        <p className="text-gray-300">Login to your account to access your profile.</p>
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-gray-800 text-white p-2 my-4"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-800 text-white p-2 my-4"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Login</button>
                    </motion.div>
                </div>
            </form>
        </div>
    );
}
