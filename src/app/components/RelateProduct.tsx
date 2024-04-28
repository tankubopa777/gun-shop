import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from "next/link";


const RelatedProducts = () => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8001/product/getproductsByType/Handgun', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            const formattedProducts = data.Products.map(product => ({
                id: product.id,
                name: product.product_name,
                price: `$${product.product_price}.00`,
                imageUrl: product.product_image || '/background/gun_weapon.jpg', 
                rating: product.positive || 0
            })).slice(0, 3); 
            setRelatedProducts(formattedProducts);
        };

        fetchProducts();
    }, []);

    return (
        <div className="mt-10 ">
            <h2 className="text-2xl font-bold mb-6">RELATED PRODUCTS</h2>
            <div className="flex overflow-x-auto gap-8">
                {relatedProducts.map((product) => (
                    <Link href={`/gun/${product.id}`} passHref>
                    <div key={product.id} className="min-w-[200px] shrink-0 cursor-pointer transform hover:scale-105 transition-transform duration-300">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-md object-contain"
                        />
                        <h3 className="text-lg font-semibold mt-3 text-white">{product.name}</h3>
                        <p className="text-gray-600">{product.price}</p>
                        <div className="flex">
                            {'★'.repeat(product.rating).padEnd(5, '☆')}
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;

