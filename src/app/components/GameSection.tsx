"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";
// HARD CODED GAME DATA (ADD YOUR IMAGES HERE)
const games = [
  {
    id: 1,
    title: "Dead or Alive2 Feature buy",
    category: "top",
    img: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    title: "Dead or Alive2 Feature buy",
    category: "top",
    img: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    title: "Dead or Alive2 Feature buy",
    category: "slots",
    img: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 4,
    title: "Dead or Alive2 Feature buy",
    category: "special",
    img: "https://picsum.photos/400/300?random=4",
  },
  {
    id: 5,
    title: "Dead or Alive2 Feature buy",
    category: "new",
    img: "https://picsum.photos/400/300?random=5",
  },
  {
    id: 6,
    title: "Dead or Alive2 Feature buy",
    category: "live",
    img: "https://picsum.photos/400/300?random=6",
  },
];

// CATEGORY FILTERS
const tabs = [
  { key: "all", label: "All Game" },
  { key: "top", label: "Top Game" },
  { key: "new", label: "New Game" },
  { key: "special", label: "Special" },
  { key: "slots", label: "Slots" },
  { key: "live", label: "Live" },
];

// 动画容器配置
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

// 游戏卡片动画配置
const cardVariants: Variants  = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// 标签按钮动画配置
const tabVariants: Variants  = {
  inactive: { scale: 1 },
  active: { scale: 1.05 }
};

export default function GameSection() {
  const [activeTab, setActiveTab] = useState("top");

  const filteredGames =
    activeTab === "all"
      ? games
      : games.filter((item) => item.category === activeTab);

  return (
    <motion.div 
      className="w-full bg-[#120806] py-12 text-white font-sans"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-[1500px] mx-auto px-8">

        {/* FILTER BAR */}
        <motion.div 
          className="flex items-center justify-between mb-10"
          variants={cardVariants}
        >
          {/* LEFT TABS */}
          <div className="flex items-center gap-3 bg-[#1d1310] rounded-xl border border-[#3d2a24] p-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#FF3D20] to-[#FF7A34] text-white shadow-lg"
                    : "text-gray-300 hover:text-white"
                }`}
                variants={tabVariants}
                animate={activeTab === tab.key ? "active" : "inactive"}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* VIEW ALL BUTTON */}
          <motion.button 
            className="flex items-center gap-2 px-5 py-2 bg-[#1f1410] border border-[#3d2a24] rounded-lg text-sm hover:bg-[#2a1814] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white">View All</span>
          </motion.button>
        </motion.div>

        {/* GAME CARDS — ONE ROW SCROLL */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          <AnimatePresence mode="wait">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                className="min-w-[180px] rounded-xl p-1 bg-[#1d110e] border border-[#3d2a24] shadow-lg hover:shadow-[0_0_20px_rgba(255,80,40,0.4)] transition"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -30 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 20px rgba(255, 80, 40, 0.3)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Image */}
                <div className="w-full h-[120px] rounded-lg overflow-hidden">
                  <Image
                    src={game.img}
                    alt={game.title}
                    width={200}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Text */}
                <div className="px-2 py-3">
                  <h3 className="text-[14px] font-semibold text-white leading-tight">
                    {game.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1">OUR ORIGINAL</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}