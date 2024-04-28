"use client";
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Cursor from '../components/Cursor';
import Footer from '../components/Footer';
import Transition from '../components/Transition';
import { motion, useAnimation } from 'framer-motion';

type CreatorProps = {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    githubUrl?: string;
    linkedinUrl?: string;
};

const CreatorCard: React.FC<CreatorProps> = ({ name, role, bio, imageUrl, githubUrl, linkedinUrl }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-black text-center p-4">
            <img className="w-24 h-24 rounded-full mx-auto" src={imageUrl} alt={name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">{name}</div>
                <p className="text-white text-base">{role}</p>
                <p className="text-white text-sm">{bio}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {githubUrl && (
                    <a href={githubUrl} className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#Github</a>
                )}
                {linkedinUrl && (
                    <a href={linkedinUrl} className="inline-block bg-blue-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">#LinkedIn</a>
                )}
            </div>
        </div>
    );
};

const AboutPage = () => {
    const control = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        control.start("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [control]);

    const fadeInClient = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className='w-full h-full bg-black'>
            <Transition />
            <Cursor />
            <Navbar />
            <motion.div
                ref={ref}
                initial="hidden"
                animate={control}
                variants={fadeInClient}
                className="container mx-auto px-4 pt-16 mb-24 ">
                <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    <CreatorCard
                        name="Warunporn Intarachana"
                        role="Frontend Developer"
                        bio="Tan has over 10 years of experience building web applications and is passionate about creating user-centric solutions."
                        imageUrl="/profile/tanprofile.jpeg"
                        githubUrl="https://github.com/tankubopa777"
                        linkedinUrl="https://www.linkedin.com/in/warunporn-intarachana-9b7253181/"
                    />
                    <CreatorCard
                        name="Viphava Khlaisuwan"
                        role="Backend Developer"
                        bio="Ohm is a designer who specializes in creating intuitive interfaces and engaging user experiences."
                        imageUrl="/profile/ohmprofile.png"
                        githubUrl="https://github.com/Viphava280444"
                        linkedinUrl="https://www.linkedin.com/in/viphava-khlaisuwan-613439256/"
                    />
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default AboutPage;
