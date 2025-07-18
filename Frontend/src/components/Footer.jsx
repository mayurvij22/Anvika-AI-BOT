import React from "react";
import { FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-white shadow-inner py-4 mt-10 text-center text-sm text-gray-600">
     <p>© 2025 mayorZ. Built with 🧡 by Mayur.</p>
      <div className="mt-2 flex justify-center gap-6 text-blue-600 text-lg">
        <a
          href="https://myr-mayurvij22s-projects.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <FaGlobe />
          Portfolio
        </a>
        <a
          href="https://www.linkedin.com/in/mayur-patil-033787250/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <FaLinkedin />
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/mayur_.p07"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:underline"
        >
          <FaInstagram />
          Instagram
        </a>
      </div>
    </footer>
  );
}

export default Footer;
