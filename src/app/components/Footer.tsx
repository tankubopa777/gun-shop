"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Column 1 */}
                <div>
                    <h5 className="font-bold mb-3">HELLO</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim.</p>
                </div>
                {/* Column 2 */}
                <div>
                    <h5 className="font-bold mb-3">OFFICE</h5>
                    <p>Germany — 785 15th Street, Office 478 Berlin, De 81566</p>
                    <p className="mt-4">info@email.com</p>
                    <p className="mt-2">+1 840 841 25 69</p>
                </div>
                {/* Column 3 */}
                <div>
                    <h5 className="font-bold mb-3">LINKS</h5>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/about-us">About Us</Link></li>
                        <li><Link href="/shop">Shop</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
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
