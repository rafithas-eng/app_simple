'use client';

import React, { useState } from 'react';
import Layout from '../components/layout';
import Header from '@/app/components/header/page';
import Menu from '@/app/components/menu/page';
import Content from '@/app/components/content/page';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/verify-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setMessage('Login successful');
            } else {
                setMessage('Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <Layout>
            <Header />
            <Menu />
            <Content>
                <h1 className="text-2xl font-bold">Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                {message && <p>{message}</p>}
            </Content>
        </Layout>
    );
}