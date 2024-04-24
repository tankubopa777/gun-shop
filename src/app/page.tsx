"use client";
import React from 'react';
import Image from "next/image";
import Navbar from "./components/Navbar";
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Transition from './components/Transition';
import Link from 'next/link';
import CounterExp from './components/CouterExp';

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
    <div className='bg-black'>
      <Transition />
      <Cursor />
      <Navbar />
      <motion.div
        variants={fadeIn('right', 0.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="relative flex flex-col items-center justify-center h-full">
        <Image
          src="/background/sniper_rifle.jpg"
          alt="Gun Shop"
          width={2200}
          height={2000}
          className="z-0"
        />
        <div className=''>
          <p className="absolute transform z-10 text-white font-thin text-8xl top-10 left-10 text-responsive">
            Welcome to our Store
            <span className="text-7xl block text-responsive">The best gun shop in town</span>
          </p>
        </div>
      </motion.div>

      {/* ours cilent */}
      <div ref={ref} className='w-full bg-black'>
        <motion.div
          variants={fadeInClient}
          initial="hidden"
          animate={control}
          className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
            <div className=''>
              <Image src='/background/s&w.jpeg' alt='Smith & Wesson' width={500} height={500} className='rounded-lg mt-20' />
            </div>
            <div className=''>
              <Image src='/background/Ruger-Symbol.png' alt='Smith & Wesson' width={500} height={800} className='rounded-lg mt-20' />
            </div>
            <div className=''>
              <Image src='/background/sigsauer.png' alt='Smith & Wesson' width={500} height={500} className='rounded-lg mt' />
            </div>
            <div className=''>
              <Image src='/background/springfield.jpeg' alt='Smith & Wesson' width={500} height={400} className='rounded-lg' />
            </div>
          </div>
        </motion.div>

        <div className='mt-10'>
          <h1 className='marquee text-9xl'>WEAPON CATEGORY</h1>
        </div>

        {/* Gun type */}
        <motion.div
          variants={fadeInClient}
          initial="hidden"
          animate={control}
          className='container mx-auto mt-10 bg-black'>
          <div className='grid grid-cols-4 '>
            <div className="col-span-2 mr-5 relative w-full h-full">
              <Link href="../gun" >
                <img src="/background/pistalbg.jpeg" alt="Smith & Wesson" className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-75 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
                  <p className="text-white text-xl">PISTOL</p>
                </div>
              </Link>
            </div>


            <div className='col-span-2 grid-cols-2 grid gap-4'>

              <div className="relative">
                <Link href="../gun" >
                  <img src="/background/smgbg.jpeg" alt="Smith & Wesson" className="transition duration-300 ease-in-out w-full h-full blur-none hover:blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
                    <p className="text-white text-xl">SUBMACHINE GUN</p>
                  </div>
                </Link>
              </div>

              <div className="relative">
                <Link href="../gun" >
                  <img src="/background/shotgunbg.jpeg" alt="Smith & Wesson" className="transition duration-300 ease-in-out w-full h-full blur-none hover:blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
                    <p className="text-white text-xl">SHOTGUN</p>
                  </div>
                </Link>
              </div>

              <div className="relative">
                <Link href="../gun" >
                  <img src="/background/sniperbg.jpeg" alt="Smith & Wesson" className="transition duration-300 ease-in-out w-full h-full blur-none hover:blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
                    <p className="text-white text-xl">SNIPER</p>
                  </div>
                </Link>
              </div>

              <div className="relative">
                <Link href="../gun" >
                  <img src="/background/m4a1bg.jpeg" alt="Smith & Wesson" className="transition duration-300 ease-in-out w-full h-full blur-none hover:blur-sm" />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100">
                    <p className="text-white text-xl">ASSAULT RIFFLE</p>
                  </div>
                </Link>

              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={fadeInClient}
          initial="hidden"
          animate={control}
          className='container mx-auto mt-10 bg-black'>
          <CounterExp />
        </motion.div>
        <Footer />
      </div>

    </div>
  );
}
