"use client";
import React from 'react';
import Image from 'next/image';

const relatedProducts = [
    {
        id: 'bulletproof-vest',
        name: 'Bulletproof Vest',
        priceRange: '$220.00 - $230.00',
        imageUrl: '/background/gun_weapon.jpg',
        rating: 4,
    },
    {
        id: 'pistol',
        name: 'Pistol',
        priceRange: '$500.00 - $600.00',
        imageUrl: '/background/gun_weapon.jpg',
        rating: 5,
    },
    {
        id: 'rifle',
        name: 'Rifle',
        priceRange: '$1,000.00 - $1,200.00',
        imageUrl: '/background/gun_weapon.jpg',
        rating: 4,
    },
];

const RelatedProducts = () => {
    return (
        <div className="mt-10 ">
            <h2 className="text-2xl font-bold mb-6">RELATED PRODUCTS</h2>
            <div className="flex overflow-x-auto gap-8">
                {relatedProducts.map((product) => (
                    <div key={product.id} className="min-w-[200px] shrink-0">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-md object-contain"
                        />
                        <h3 className="text-lg font-semibold mt-3 text-white">{product.name}</h3>
                        <p className="text-gray-600">{product.priceRange}</p>
                        <div className="flex">
                            {'★'.repeat(product.rating).padEnd(5, '☆')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
