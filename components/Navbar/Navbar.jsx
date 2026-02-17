import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "about", label: "About", path: "/about" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "experience", label: "Experience", path: "/experience" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent relative">
      <div className="text-white flex justify-between items-center py-5 px-6">
        {/* Logo */}
        <div className="text-lg font-bold cursor-pointer font-mono">
          <span className="text-[#8245ec]">&lt;</span>
          <span className="text-[#ffffff]">Arman</span>
          <span className="text-[#8245ec]">/</span>
          <span className="text-[#ff0000]">Phaugat</span>
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 gap-24 text-gray-300 font-mono">
          {menuItems.map((item) => (
            <li key={item.id} className="cursor-pointer">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-[#8245ec] ${
                    isActive ? "text-[#8245ec]" : "text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Social Icons */}
        <div className="hidden md:flex items-center space-x-4 gap-8 text-gray-300">
          <a
            href="https://github.com/armanphaugat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/armanphaugat05/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://leetcode.com/u/armanphaugat20/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <SiLeetcode size={24} color="#FFA116" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (appears below navbar) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-95 py-6 z-40 border-t border-gray-700">
          <ul className="flex flex-col items-center space-y-4 text-gray-300 font-mono text-lg">
            {menuItems.map((item) => (
              <li key={item.id} className="cursor-pointer">
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
                  className={({ isActive }) =>
                    `hover:text-[#8245ec] transition-colors duration-300 ${
                      isActive ? "text-[#8245ec]" : "text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Social Icons */}
          <div className="flex items-center justify-center space-x-6 text-gray-300 pt-6">
            <a
              href="https://github.com/armanphaugat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://www.linkedin.com/in/armanphaugat05/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="https://leetcode.com/u/armanphaugat20/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <SiLeetcode size={26} color="#FFA116" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
