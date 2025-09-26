import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              {/* Website Logo */}
              <a href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">Task Manager</span>
              </a>
            </div>
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-3 ">
            <Link href="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-indigo-500 hover:text-white transition duration-300">
              Login
            </Link>
            <Link href="/register" className="py-2 px-2 font-medium text-white bg-indigo-500 rounded hover:bg-indigo-400 transition duration-300">
              Register
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button">
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-indigo-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
