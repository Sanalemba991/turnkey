"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import GameHeader from "./GameHeader";

const gameData = [
  {
    id: 1,
    title: "AZTEC MAGIC DELUXE",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=1",
  },
  {
    id: 2,
    title: "AZTEC MAGIC MEGAWAYS",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=2",
  },
  {
    id: 3,
    title: "BEAST BAND",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=3",
  },
  {
    id: 4,
    title: "BIG ATLANTIS FRENZY",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=4",
  },
  {
    id: 5,
    title: "MULTIHAND BLACKJACK PRO",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=5",
  },
  {
    id: 6,
    title: "BOB'S COFFEE SHOP",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=6",
  },
  {
    id: 7,
    title: "BONANZA BILLION",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=7",
  },
  {
    id: 8,
    title: "BOOK OF PANDA MEGAWAYS",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=8",
  },
  {
    id: 9,
    title: "BOOK OF PYRAMIDS",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=9",
  },
  {
    id: 10,
    title: "BRAVE VIKING",
    provider: "BGAMING",
    image: "https://picsum.photos/400/600?random=10",
  },
];



export default function GameGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const hoverVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <>
    <GameHeader />
    <section className="w-full py-6 px-4 bg-[#0a0603]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {gameData.map((game) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className="group cursor-pointer"
            >
              <motion.div
                className="relative h-40 rounded-lg overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]"
                variants={hoverVariants}
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
              </motion.div>

              <div className="mt-2">
                <h3 className="text-white font-bold text-xs group-hover:text-[#FF7A34] transition-colors line-clamp-2">
                  {game.title}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">{game.provider}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
  
}
