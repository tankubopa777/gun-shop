"use client";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

export default function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/gun/${product.id}`}>
            <div className='bg-gray-900 shadow-lg p-6 h-full flex flex-col justify-between cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl'>
                <div>
                    <Image
                        src={product.product_image || "/background/pistalbg.jpeg"}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="rounded-md"
                    />
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

