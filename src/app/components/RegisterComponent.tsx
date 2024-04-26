"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

export default function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter(); // Router initialization

    const handleAuth = async (event: any) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const details = {
            'grant_type': '',
            'username': username,
            'password': password,
            'scope': '',
            'client_id': '',
            'client_secret': '',
        };

        const formBody = Object.keys(details)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`)
            .join('&');

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await response.json();
            setOpenModal(true);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: 'url("https://images.alphacoders.com/132/1326072.jpeg")' }}>
            <Modal title="Register successful" message="Login and start shopping!" isOpen={openModal} status="success"
                onUnderstood={() => { router.push('/login'); }} setIsOpen={setOpenModal} />
            <div className="max-w-lg w-full space-y-8 bg-white bg-opacity-40 backdrop-blur-md rounded-lg shadow-lg">
                <div className="m-10">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Register your account
                    </h2>
                    <p className="text-center text-sm text-gray-600">
                        Or <a href="../login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Login here
                        </a>
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleAuth}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mx-5">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="relative mx-5">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? '👁️' : '🔒'}
                                </button>
                            </div>
                        </div>
                        <div className="relative mx-5">
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirm-password" name="confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="current-password" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? '👁️' : '🔒'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
