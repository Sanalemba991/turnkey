import { Metadata } from "next";
import Home from "./components/Home";
import GameSection from "./components/GameSection";
import LuckyFlowSection from "./components/LuckyFlowSection";
import ProvidersRow from "./components/ProvidersRow";
import GameGrid from "./components/GameGrid";
export const metadata: Metadata = {
  title:
    "Trunkey – Turnkey Worldwide Gaming Platform | Online Games, Global Play & Digital Entertainment",

  description:
    "Trunkey is a turnkey worldwide gaming platform offering a modern, fast and secure place to play a wide selection of online games. Discover global gaming experiences, seamless account management, instant play features, and a premium entertainment lobby similar to top platforms worldwide.",

  keywords:
    "Trunkey, gaming platform, turnkey gaming, online games, global gaming platform, worldwide play, digital entertainment, game lobby, casino-style games, instant play, web gaming platform",

  openGraph: {
    title:
      "Trunkey – Turnkey Worldwide Gaming Platform | Play Hundreds of Games",
    description:
      "Trunkey delivers a premium turnkey gaming experience with a global game lobby, seamless play, secure accounts, and a modern interface inspired by leading entertainment platforms.",
    type: "website",
    url: "https://trunkey.com",
    siteName: "Trunkey – Worldwide Gaming Platform",
    images: [
      {
        url: "/trunkey.png",
        width: 1200,
        height: 630,
        alt: "Trunkey – Turnkey Worldwide Gaming Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trunkey – Worldwide Gaming Platform | Online Games & Global Play",
    description:
      "Trunkey is a fast, secure, and modern turnkey gaming platform featuring a global lobby of online games and smooth entertainment experiences.",
    images: ["/trunkey.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Pages() {
  return (
    <>
      <Home />
      <GameSection />
      <GameGrid />
      <LuckyFlowSection />
      <GameGrid />
      <ProvidersRow />
    </>
  );
}
