"use client";
import React, { useState } from 'react';

export default function AuthComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async (event: React.FormEvent) => {
        event.preventDefault();

        // Initialize the details object with all necessary fields
        // The empty strings represent the empty values for grant_type, scope, client_id, and client_secret
        const details = {
            'grant_type': '',
            'username': username,
            'password': password,
            'scope': '',
            'client_id': '',
            'client_secret': '',
        };

        // Construct the form body
        const formBody = Object.keys(details)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`)
            .join('&');

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register/', { // Ensure the trailing slash is present if required by your server
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Handle the response data here
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleAuth}>
            <input
                type="email"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}
