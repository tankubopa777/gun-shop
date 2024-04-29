"use client";
import React from 'react';
import Link from 'next/link';
import Dashboard from '../dashboard/page';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10">
            <div className="text-center border-t border-gray-700 mt-8 pt-8">
            </div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Column 1 */}
                <div>
                    <h5 className="font-bold mb-3">Gun shop</h5>
                    <p>This is final project ecom application website.</p>
                </div>
                {/* Column 2 */}
                <div>
                    <h5 className="font-bold mb-3">OFFICE</h5>
                    <p>Thailand — Thammasat University, Rangsit Campus, 99 Moo 18, Khlong Luang, Pathum Thani 12120, Thailand</p>
                    <p className="mt-4">info@tu.ac.th</p>
                    <p className="mt-2">+66 2 986 9009</p>
                </div>
                {/* Column 3 */}
                <div>
                    <h5 className="font-bold mb-3">LINKS</h5>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/gun">Shop</Link></li>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>
                {/* Column 4 */}
                <div>
                    <h5 className="font-bold mb-3">GET IN TOUCH</h5>
                    <ul>
                        <li> Facebook</li>
                        <li> Twitter</li>
                        <li> Dribbble</li>
                        <li> Instagram</li>
                    </ul>
                </div>
            </div>
            <div className="text-center border-t border-gray-700 mt-8 pt-8">
                <p>Tankubopa © 2024. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
