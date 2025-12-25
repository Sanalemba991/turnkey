"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ProvidersRow() {
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const providers = [
    { name: "Play'n GO", logo: "/gaming/playin.png" },
    { name: "Pragmatic Play", logo: "/gaming/pragamatic.png" },
    { name: "Evolution", logo: "/gaming/evolution.png" },
    { name: "NetEnt", logo: "/gaming/netent.png" },
    { name: "Microgaming", logo: "/gaming/micro.png" },
    { name: "Relax Gaming", logo: "/gaming/rela.png" },
  ];

  // Duplicate providers for seamless looping
  const items = [...providers, ...providers];
  const itemWidth = 144; // min-w-[140px] + gap-4
  const totalItems = providers.length;

  const scrollToIndex = (index: number, duration: number = 0.8) => {
    controls.start({
      x: -index * itemWidth,
      transition: {
        duration,
        ease: "easeInOut",
      },
    });
  };

  // Auto-play with smooth continuous scrolling
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Reset to 0 when reaching the end for seamless loop
          if (nextIndex >= totalItems) {
            setTimeout(() => {
              controls.set({ x: 0 });
              return 0;
            }, 800);
            return 0;
          }
          return nextIndex;
        });
      }, 3500);

      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [isAutoPlay, totalItems]);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const move = (dir: string) => {
    setIsAutoPlay(false);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    let newIndex = currentIndex;
    if (dir === "next") {
      newIndex = currentIndex + 1;
      if (newIndex >= totalItems) {
        controls.set({ x: 0 });
        newIndex = 1;
      }
    } else {
      newIndex = currentIndex - 1;
      if (newIndex < 0) {
        controls.set({ x: -(totalItems - 1) * itemWidth });
        newIndex = totalItems - 2;
      }
    }

    setCurrentIndex(newIndex);

    // Resume auto-play after delay
    setTimeout(() => {
      setIsAutoPlay(true);
    }, 4000);
  };

  return (
    <section className="relative rounded-xl bg-gradient-to-b from-[#2b1a14] to-[#120a07] p-6 overflow-hidden">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 text-white">
        <span className="h-2 w-2 rounded-full bg-orange-500" />
        <h3 className="text-sm font-medium">Providers</h3>
      </div>

      {/* Prev Button */}
      <button
        onClick={() => move("prev")}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black transition-all duration-300"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={() => move("next")}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black transition-all duration-300"
      >
        ›
      </button>

      {/* Marquee */}
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max gap-4"
          animate={controls}
          initial={{ x: 0 }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="flex h-[60px] min-w-[140px] items-center justify-center rounded-xl bg-neutral-900 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-8 object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
