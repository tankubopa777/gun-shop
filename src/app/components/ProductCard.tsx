"use client";
import React from 'react';
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/gun/${product.id}`}>
            <div className='bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col justify-between cursor-pointer'>
                <div>
                    <h1 className='text-white text-sm font-semibold'>{product.name}</h1>
                    <p className='text-gray-300 text-xs'>{product.description}</p>
                </div>
                <div className='text-white font-bold'>
                    {product.priceRange}
                </div>
            </div>
        </Link>
    );
}

