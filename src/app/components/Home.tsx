"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import Lady from "../../../public/Images/lady.png"
import Ban from "../../../public/Images/secondban.png"
export default function HeroSection() {
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

  const imageVariants: Variants  = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const cardVariants: Variants  = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const floatVariants : Variants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#120806] to-[#1a0e0b] text-white font-sans overflow-hidden">
      {/* MAIN HERO */}
      <motion.div 
        className="max-w-[1300px] ml-10 mx-auto flex items-center mb-7 mr-10 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* LEFT SECTION – SMALLER WIDTH */}
        <motion.div className="w-[42%] z-20 pr-4" variants={itemVariants}>
          <p className="text-base tracking-widest text-gray-300">
            WELCOME <span className="text-[#FF3D20] font-semibold">THE CASINO FACTORY</span>
          </p>

          <h1 className="text-[44px] font-extrabold leading-tight mt-2">
            MULTIPLY YOUR WINS
          </h1>

          <h1 className="text-[44px] font-extrabold bg-gradient-to-r from-[#FFF0C2] to-[#C39B5C] 
                         text-transparent bg-clip-text mt-1">
            TRY YOUR LUCK
          </h1>

          <p className="mt-3 text-[#FFB851] font-semibold text-lg">+1 BONUS CARD</p>

          <motion.button 
            className="mt-6 bg-gradient-to-r from-[#FF3D20] to-[#FF7A34] hover:opacity-90 
                               transition px-8 py-3 rounded-full text-base font-semibold 
                               shadow-[0_15px_30px_rgba(255,77,28,0.4)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Now
          </motion.button>

          {/* Slider Buttons */}
          <div className="flex items-center gap-3 mt-8">
            <motion.button 
              className="w-10 h-10 rounded-full bg-[#24120e] border border-[#5a3d32] 
                                 flex items-center justify-center hover:bg-[#2d1612] text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &lt;
            </motion.button>
            <motion.button 
              className="w-10 h-10 rounded-full bg-[#24120e] border border-[#5a3d32] 
                                 flex items-center justify-center hover:bg-[#2d1612] text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &gt;
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT SECTION – VERY CLOSE TO TEXT */}
        <motion.div className="w-[58%] relative flex justify-start items-end mr-10" variants={imageVariants}>
          {/* Glow */}
          <motion.div 
            className="absolute right-10 top-24 w-[320px] h-[320px] bg-[#ffcc66] 
                  opacity-20 blur-[100px] rounded-full"
            variants={floatVariants}
            initial="initial"
            animate="animate"
          ></motion.div>

          {/* Casino Background – stays close on left */}
          <Image
            src={Ban.src}
            alt="casino-background"
            width={540}
            height={420}
            className="absolute right-[120px] top-0 opacity-55 pointer-events-none"
          />

          {/* Lady Image – moved RIGHT */}
          <motion.div
            variants={floatVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 5, delay: 1 }}
          >
            <Image
              src={Lady.src}
              alt="casino-lady"
              width={340}
              height={290}
              className="relative ml-90 z-30 object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.6)] right-0"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* BOTTOM FEATURE CARDS */}
      <motion.div 
        className="bg-[#140b08] mr-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-[1350px] mx-auto flex justify-between gap-8 px-6">
          <motion.div 
            className="w-1/3 bg-[#1d110e] border border-[#3d2a24] rounded-xl p-6 flex items-center gap-4 shadow-xl hover:scale-[1.02] transition"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255, 77, 40, 0.3)" }}
          >
            <div className="w-14 h-14 bg-[#2d1914] rounded-full flex items-center justify-center text-2xl">
              🎮
            </div>
            <p className="text-gray-300 text-lg">
              Over 5000 games, enjoy new games every day!
            </p>
          </motion.div>

          <motion.div 
            className="w-1/3 bg-[#1d110e] border border-[#3d2a24] rounded-xl p-6 flex items-center gap-4 shadow-xl hover:scale-[1.02] transition"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255, 77, 40, 0.3)" }}
          >
            <div className="w-14 h-14 bg-[#2d1914] rounded-full flex items-center justify-center text-2xl">
              💰
            </div>
            <p className="text-gray-300 text-lg">
              Multiple ways to deposit, easy and convenient.
            </p>
          </motion.div>

          <motion.div 
            className="w-1/3 bg-[#1d110e] border border-[#3d2a24] rounded-xl p-6 flex items-center gap-4 shadow-xl hover:scale-[1.02] transition"
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(255, 77, 40, 0.3)" }}
          >
            <div className="w-14 h-14 bg-[#2d1914] rounded-full flex items-center justify-center text-2xl">
              📝
            </div>
            <p className="text-gray-300 text-lg">
              Sign up and start playing in less than 60 seconds.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}