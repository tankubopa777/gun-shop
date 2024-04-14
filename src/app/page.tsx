"use client";
import React from 'react';
import Image from "next/image";
import Navbar from "./components/Navbar";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

export default function Home() {
  const control = useAnimation();
  const ref = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          console.log(entry.isIntersecting);
          if (entry.isIntersecting) {
            control.start("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    } else {
      console.log("ref not attached"); // Debug: Check if the ref is attached
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [control]);

  const fadeInClient = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };


  const fadeIn = (direction: string, delay: number) => {
    return {
      hidden: {
        y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
        opacity: 0,
        x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        transition: {
          type: 'tween',
          duration: 1.5,
          delay: delay,
          ease: [0.25, 0.6, 0.3, 0.8],
        },
      },
      show: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          duration: 1.4,
          delay: delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        },
      },
    };
  };



  return (
    <div className=''>
      <Cursor />
      <Navbar />
      <motion.div
        variants={fadeIn('right', 0.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="relative flex flex-col items-center justify-center h-full">
        <Image
          src="/sniper_rifle.jpg"
          alt="Gun Shop"
          width={2200}
          height={2000}
          className="z-0"
        />
        <div>
          <p className="absolute transform z-10 text-white font-thin text-8xl top-10 left-10">
            Welcome to our Store
            <span className="text-7xl block">The best gun shop in town</span>
          </p>
        </div>
      </motion.div>

      {/* ours cilent */}
      <div ref={ref} className='w-full'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-900 rounded-xl shadow-lg p-6 h-full flex flex-col justify-between interactive'>
              <h1 className='text-white text-4xl font-semibold'>Smith & Wesson</h1>
              <p className='text-gray-300'>
                Smith & Wesson Brands, Inc. is an American manufacturer of firearms, ammunition and restraints. The corporate headquarters is in Springfield, Massachusetts. Smith & Wesson was founded by Horace Smith and Daniel B. Wesson as the "Smith & Wesson Revolver Company" in 1852 after their previous company, also called the "Smith & Wesson Company" and later renamed as "Volcanic Repeating Arms", was sold to Oliver Winchester and became the Winchester Repeating Arms Company.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>Ruger</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>SIG SAUER</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>Springfield Armory</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
          </div>
        </div>

        {/* Gun type */}
        <div className='container mx-auto mt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>Pistol</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>Rifle</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>Shotgun</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
            <motion.div
              variants={fadeInClient}
              initial="hidden"
              animate={control}
              className='bg-gray-800 rounded-lg p-4'>
              <h1 className='text-white text-4xl'>Submachine Gun</h1>
              <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatem.</p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>

    </div>
  );
}
