"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { useParams } from 'next/navigation';
import Footer from '@/app/components/Footer';
import Cursor from '@/app/components/Cursor';
import Transition from '@/app/components/Transition';
import UserReviews from '@/app/components/UserReviews';
import RelatedProducts from '@/app/components/RelateProduct';
import Link from 'next/link';
import { to } from '../../../../.next/static/chunks/main-app';

const fetchGunDetails = async (id: any) => {
    const response = await fetch(`http://localhost:8001/product/getproductsByID/${id}?type=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch gun details');
    }
    const data = await response.json();
    return data.Product;
};


export default function GunDetail() {
    const [gunDetails, setGunDetails] = useState(null);
    const params = useParams();
    const id = params.id ? params.id.toString() : '';
    const [comment, setComment] = useState('');
    const [userComment, setUserComment] = useState('');

    const handleAddToBasket = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (!token) {
            alert('You must be logged in to add items to the basket.');
            return;
        }

        const response = await fetch('http://localhost:8002/order/addBasket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: id,
                order_quantity: 1
            })
        });

        if (!response.ok) {
            const message = await response.text();
            alert('Failed to add to basket: ' + message);
            return;
        }

        alert('Added to basket successfully!');
    };


    useEffect(() => {
        if (id) {
            fetchGunDetails(id)
                .then(details => {
                    setGunDetails(details);
                })
                .catch(error => {
                    console.error('Error fetching gun details:', error);
                });
        }
    }, [id]);

    if (!gunDetails) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-lg text-gray-700 font-semibold">Loading gun details...</h2>
            </div>
        );
    }

    const token = localStorage.getItem('token')

    let reviews = [];
    try {
        reviews = JSON.parse(gunDetails.reviews)?.comments || [];
    } catch (error) {
        console.error('Error parsing reviews:', error);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8001/product/reviews', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: gunDetails.id,
                username: userComment,
                comment: comment
            })
        });

        if (!response.ok) {
            const message = await response.text();
            alert('Failed to submit comment: ' + message);
            return;
        }

        setComment('');
        alert('Comment submitted successfully!');
    };

    return (
        <div className='bg-black'>
            <Transition />
            <Cursor />
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0 }}
                className="container mx-auto my-8 p-4 "
            >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <Image
                        src={gunDetails.product_image || "/background/sniper_rifle.jpg"}
                        alt={gunDetails.product_name}
                        width={500}
                        height={500}
                        className="rounded-md"
                    />
                    <div>
                        <h1 className="text-2xl font-thin text-white ">{gunDetails.product_name}</h1>
                        <p className="text-lg text-white mt-2 font-thin">{gunDetails.product_description}</p>
                        <div className="flex items-center mt-4 space-x-5">
                            <div className="text-xl font-thin text-white">${gunDetails.product_price}</div>
                            <div className="text-xl font-thin text-white">Amount {gunDetails.product_quantity}</div>
                            <div className="text-xl font-thin text-white">Sale {gunDetails.saled}</div>
                            {/* <div className="ml-4">
                                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
                            </div> */}
                        </div>
                        {/* <Link href={`/payment`}> */}
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-thin py-2 px-4 rounded mt-8 transition-colors duration-200"
                            onClick={handleAddToBasket}>
                            Add to Basket
                        </button>
                        {/* </Link> */}
                        <div className="flex items-center mt-4">
                            {/* Icons for safe checkout can be added here */}
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl text-white font-thin">USER REVIEW  <span className="text-xl font-thin text-white">All Comment {gunDetails.reviews_quantity}</span></h2>
                    <div className="flex flex-col">
                        <div className="text-xl font-thin text-white">Positive Comment {gunDetails.positive}</div>
                        <div className="text-xl font-thin text-white">Negative Comment {gunDetails.negative}</div>
                    </div>
                </div>
                <div>
                    {reviews.length > 0 ? (
                        <div className="space-y-4 grid grid-cols-3">
                            {reviews.map((review, index) => (
                                <div key={index}>
                                    <UserReviews username={review.username} date={''} reviewPoints={0} reviewText={review.comment} userImageUrl={''} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white">No reviews available.</p>
                    )}
                </div>
                {/* Reviews and other sections */}
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl text-black">Add Your Review</h2>
                    {/* your name */}
                    <input
                        type="text"
                        value={userComment}
                        onChange={(e) => setUserComment(e.target.value)}
                        className="w-full mt-2 p-2 text-white bg-gray-900 rounded-xl"
                        placeholder="Your Name"
                        required
                    />
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full mt-2 p-2 text-white bg-gray-900 rounded-xl"
                        placeholder="Write your review here..."
                        required
                    ></textarea>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                        Submit Review
                    </button>
                </form>
                <div className='w-full'>
                    <RelatedProducts />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
}
