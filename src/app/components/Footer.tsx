"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#120907] text-white py-20 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LEFT TEXT + SOCIAL ICONS */}
        <div>
          <p className="text-gray-300 leading-relaxed mb-6 max-w-[300px]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <div className="flex items-center gap-3 text-xl">
            <a href="#"><i className="fa-brands fa-telegram text-[#40a9ff]"></i></a>
            <a href="#"><i className="fa-brands fa-discord text-[#5865F2]"></i></a>
            <a href="#"><i className="fa-brands fa-twitter text-[#1DA1F2]"></i></a>
            <a href="#"><i className="fa-brands fa-instagram text-[#E4405F]"></i></a>
            <a href="#"><i className="fa-brands fa-youtube text-[#FF0000]"></i></a>
          </div>
        </div>

        {/* ABOUT US SECTION */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About us</h3>

          <ul className="space-y-3 text-gray-300">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-white">How To Play</a></li>
          </ul>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <ul className="space-y-3 text-gray-300 text-sm">
            <li>
              <span className="font-semibold text-white">Support :</span>{" "}
              support@tmf.com
            </li>
            <li>
              <span className="font-semibold text-white">Partners :</span>{" "}
              partners@tmf.com
            </li>
            <li>
              <span className="font-semibold text-white">Legal :</span>{" "}
              legal@tmf.com
            </li>
          </ul>
        </div>

        {/* NEWSLETTER FORM */}
        <div className="bg-[#1b0f0d] p-6 rounded-xl shadow-[0_0_25px_rgba(255,80,30,0.15)]">
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#2a1916] border border-[#3b2722] rounded-lg px-4 py-2 outline-none text-sm placeholder-gray-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#2a1916] border border-[#3b2722] rounded-lg px-4 py-2 outline-none text-sm placeholder-gray-400"
            />

            <button className="w-full bg-gradient-to-r from-[#ff4d1c] to-[#ff7a34] text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition">
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
