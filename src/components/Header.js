"use client";

import { useState } from "react";
import { Search, Bell, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ currentPage = "property" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log("Searching for:", searchQuery);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              LOGO
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={
                  currentPage === "property"
                    ? "Search properties..."
                    : "Search jobs..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/properties"
              className={`hover:text-pink-200 transition-colors ${
                currentPage === "property" ? "text-pink-200" : ""
              }`}
            >
              Property
            </Link>
            <Link
              href="/profile"
              className={`hover:text-pink-200 transition-colors ${
                currentPage === "profile" ? "text-pink-200" : ""
              }`}
            >
              Profile
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-pink-200 transition-colors">
              <Bell size={24} />
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded border border-white hover:bg-white hover:text-pink-500 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-pink-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/properties"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-pink-200"
              >
                Property
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-pink-200"
              >
                Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
