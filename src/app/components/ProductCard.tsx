"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
    return (
        <Link href={`/products/${product.id}`}>
            <div className='bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col justify-between'>
                <div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        objectFit='contain'
                    />
                </div>
                <div>
                    <h1 className='text-white text-sm font-semibold'>{product.name}</h1>
                    <p className='text-gray-300'>{product.description}</p>
                    <div className='text-white'>{product.priceRange}</div>
                </div>
            </div>
        </Link>
    );
}
