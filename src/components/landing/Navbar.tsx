import { useState } from "react";
import { Menu, X } from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#1A1A2E]/80 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#2D2D44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center"
          >
            <img
              src={brandLogo}
              alt="Projex"
              className="h-12 w-12"
            />
            <span className="text-xl font-bold text-[#1A1A2E] dark:text-white">Projex</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/login"
              className="px-4 py-2 text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white font-medium transition-colors"
            >
              Login
            </a>
            <a
              href="/signup"
              className="px-5 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-md hover:shadow-lg"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-[#4A4A68] dark:text-[#9CA3AF]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1A1A2E] border-b border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2 text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2D2D44] space-y-3">
              <a
                href="/login"
                className="block py-2 text-[#4A4A68] dark:text-[#9CA3AF] font-medium"
              >
                Login
              </a>
              <a
                href="/signup"
                className="block w-full text-center px-5 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899]"
              >
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
