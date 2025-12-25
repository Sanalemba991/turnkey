"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import Ban from "../../../public//images/secondban.png"
import Ban2 from "../../../public/images/ban.png"
import Didi from "../../../public/Images/ddd.png"
export default function LuckyFlowSection() {
  // Animation variants
  const containerVariants: Variants  = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants  = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants: Variants  = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatVariants: Variants  = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 7,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Banner Background Images */}
      <Image
        src={Ban.src}
        alt="Lucky Flow Banner Second"
        fill
        priority
        className="object-cover absolute inset-0 z-0"
      />

      {/* Background glow (optional, can be removed if not needed) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.18),transparent_65%)] z-0" />

      {/* Main Container */}
      <motion.div 
        className="relative z-10 max-w-7xl w-full px-6 py-20 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.h1 
          className="text-white text-4xl md:text-5xl font-extrabold tracking-wide"
          variants={itemVariants}
        >
          HOLD, EARN, CLAIM, CELEBRATE
        </motion.h1>

        <motion.p 
          className="mt-4 text-gray-300 text-sm md:text-base"
          variants={itemVariants}
        >
          Earn and Redeem your points for Revenue <br />
          <span className="text-orange-400 font-semibold">Rewards</span> and
          more!
        </motion.p>

        {/* Main Area */}
        <motion.div 
          className="relative mt-16 flex items-center justify-center"
          variants={itemVariants}
        >
          {/* Center Character Image */}
          <div className="relative flex items-center justify-center">
            <Image
              src={Ban2.src}
              alt="Character Background"
              width={700}
              height={600}
              priority
              className="object-contain"
            />
            
            {/* Fix for the floating image */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={floatVariants}
              initial="initial"
              animate="animate"
              style={{ zIndex: 10 }}
            >
              <Image
                src={Didi.src}
                alt="Character"
                width={350}
                height={350}
                priority
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* STEP 01 */}
          <motion.div 
            className="absolute left-10 top-0 w-72 bg-[#1b120f] border border-orange-500/30 rounded-xl p-5 text-left shadow-lg"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 120, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <span className="w-8 h-8 flex items-center justify-center bg-orange-500 text-black rounded-full text-sm font-bold">
              01
            </span>

            <h3 className="mt-3 text-white font-semibold text-lg">
              GET YOUR $LUCKY
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Purchase <span className="text-orange-400">$LUCKY</span> from a
              centralized or decentralized exchange.
            </p>

            {/* Right small image placeholder */}
            <div className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-10 h-20 bg-[#d8b58a] rounded-md" />
          </motion.div>

          {/* STEP 02 */}
          <motion.div 
            className="absolute right-10 top-0 w-72 bg-[#1b120f] border border-orange-500/30 rounded-xl p-5 text-left shadow-lg"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 120, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <span className="ml-2 w-8 h-8 flex items-center justify-center bg-orange-500 text-black rounded-full text-sm font-bold">
              02
            </span>

            <h3 className="ml-2 mt-3 text-white font-semibold text-lg">
              GET YOUR $LUCKY
            </h3>

            <p className="ml-2 mt-2 text-sm text-gray-400">
              Purchase <span className="text-orange-400">$LUCKY</span> from a
              centralized or decentralized exchange.
            </p>
            <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-10 h-20 bg-[#d8b58a] rounded-md" />
          </motion.div>

          {/* STEP 03 */}
          <motion.div 
            className="absolute left-0 bottom-0 w-72 bg-[#1b120f] border border-orange-500/30 rounded-xl p-5 text-left shadow-lg"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 120, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <span className="w-8 h-8 flex items-center justify-center bg-orange-500 text-black rounded-full text-sm font-bold">
              03
            </span>

            <h3 className="mt-3 text-white font-semibold text-lg">
              GET YOUR $LUCKY
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Purchase <span className="text-orange-400">$LUCKY</span> from a
              centralized or decentralized exchange.
            </p>
            <div className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-10 h-20 bg-[#d8b58a] rounded-md" />
          </motion.div>

          {/* STEP 04 */}
          <motion.div 
            className="absolute right-0 bottom-0 w-72 bg-[#1b120f] border border-orange-500/30 rounded-xl p-5 text-left shadow-lg"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 120, 0, 0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <span className="ml-2 w-8 h-8 flex items-center justify-center bg-orange-500 text-black rounded-full text-sm font-bold">
              04
            </span>

            <h3 className="ml-2 mt-3 text-white font-semibold text-lg">
              GET YOUR $LUCKY
            </h3>

            <p className="ml-2 mt-2 text-sm text-gray-400">
              Purchase <span className="text-orange-400">$LUCKY</span> from a
              centralized or decentralized exchange.
            </p>
            <div className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-10 h-20 bg-[#d8b58a] rounded-md" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}