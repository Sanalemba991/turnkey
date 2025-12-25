"use client";
import { Gamepad2 } from "lucide-react";

export default function GameHeader() {
  return (
    <div className="w-full mt-14 bg-[#1a1010] py-2 px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="bg-[#FF6B35] p-1 rounded-md w-8 h-8 flex items-center justify-center">
          <Gamepad2 size={16} className="text-white" />
        </div>
        <h2 className="text-sm font-semibold text-white">New Game</h2>
      </div>

      <div className="max-w-2xl mx-auto mt-3 h-[2px] bg-gradient-to-r from-[#FF6B35] to-transparent" />
    </div>
  );
}
