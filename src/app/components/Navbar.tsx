"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full bg-[#130905] py-3 px-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-center gap-4">

        {/* LEFT BUTTONS */}
        <div className="flex items-center gap-3">

          <button className="px-5 py-2 rounded-md bg-transparent border border-[#4a3a32] text-[#b8a094] text-sm hover:bg-[#1e1412] transition-colors">
            Tournament
          </button>

          <button className="px-5 py-2 rounded-md bg-transparent border border-[#4a3a32] text-[#b8a094] text-sm hover:bg-[#1e1412] transition-colors">
            Bonus
          </button>

        </div>

        {/* BALANCE BOX */}
        <div className="flex items-center bg-[#1c1210] border border-[#3e2e28] rounded-lg px-4 py-2 gap-3">

          <span className="text-white font-bold text-base">
            2,5486
          </span>

          <div className="w-9 h-9 rounded-full bg-[#ff5722] flex items-center justify-center text-white font-bold text-xs shadow-lg">
            SC
          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="flex items-center bg-[#1c1210] border border-[#3e2e28] rounded-lg px-3 py-1.5 w-[380px] gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          <input
            type="text"
            placeholder=""
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-600 text-sm"
          />

          <button className="bg-[#c9a882] text-[#1a0f0c] font-semibold text-xs px-4 py-1.5 rounded-md hover:bg-[#d4b594] transition-colors">
            Search
          </button>
        </div>

      </div>
    </div>
  );
}