import Image from "next/image";
import Navbar from "./components/Navbar";
import { motion } from 'framer-motion';


export default function Home() {
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
    <div>
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
        <p className="absolute transform z-10 text-white text-9xl top-10 left-10">
          Welcome to our Store
          <span className="text-8xl block">The best gun shop in town</span>
        </p>

      </motion.div>
    </div>
  );
}
