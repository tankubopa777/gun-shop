"use client";

import React from 'react';
import Image from "next/image";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import CountUp from "react-countup";

export default function CounterExp() {

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

        <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className=" hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
        >
            <div className="flex flex-1 xl:gap-x-6 ">
                {/* experience */}
                <div
                    className="relative flex-1 after:w-[1px] after:h-full
      after:bg-white/10 after:absolute after:top-0 after:right-0"
                >
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                        <CountUp start={0} end={10} duration={5} delay={0.5} />
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                        Gun company{" "}
                    </div>
                </div>

                {/* client */}
                <div
                    className="relative flex-1 after:w-[1px] after:h-full
      after:bg-white/10 after:absolute after:top-0 after:right-0"
                >
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                        <CountUp start={0} end={20} duration={5} delay={0.5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                        Movie company{" "}
                    </div>
                </div>

                {/* project*/}
                <div
                    className="relative flex-1 after:w-[1px] after:h-full
      after:bg-white/10 after:absolute after:top-0 after:right-0"
                >
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                        <CountUp start={0} end={650} duration={5} delay={0.5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                        Sold gun{" "}
                    </div>
                </div>

                {/* award */}
                <div
                    className="relative flex-1 after:w-[1px] after:h-full
       after:absolute after:top-0 after:right-0"
                >
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                        <CountUp start={0} end={2} duration={5} delay={0.5} />
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                        Competition win{""}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
