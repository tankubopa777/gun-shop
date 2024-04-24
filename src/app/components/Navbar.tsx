"use client";
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';  // Import ShoppingCart icon
import Link from 'next/link';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [basketItems, setBasketItems] = useState([]);

    const handleNav = () => {
        setNav(!nav);
    };

    const navItems = [
        { id: 1, text: 'Home', url: '../' },
        { id: 2, text: 'Gun', url: '../gun' },
        { id: 3, text: 'About', url: '../about' },
        { id: 4, text: 'Contact', url: '../about' },
    ];

    return (
        <div className='bg-black flex justify-between items-center h-24 w-full mx-auto px-4 text-white'>

            <h1 className='w-full text-3xl font-thin text-white '>GUN SHOP</h1>

            <ul className='hidden md:flex'>
                {navItems.map(item => (
                    <Link key={item.id} href={`/${item.url.toLowerCase()}`}>
                        <div
                            key={item.id}
                            className='p-4 hover:bg-[#ff4d4d] rounded-xl m-2 cursor-pointer duration-300 hover:text-white'
                        >
                            {item.text}
                        </div>
                    </Link>
                ))}

                <div className="cursor-pointer p-4"  >
                    <AiOutlineShoppingCart size={20} />
                </div>
            </ul>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={
                    nav
                        ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                        : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                }
            >
                {/* Mobile Logo */}
                <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

                {/* Mobile Navigation Items */}
                {navItems.map(item => (
                    <Link key={item.id} href={`/${item.url.toLowerCase()}`}>
                        <div
                            key={item.id}
                            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
                        >
                            {item.text}
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;
