import { Twitter, Github, Linkedin } from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1A1A2E] border-t border-[#E5E7EB] dark:border-[#2D2D44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2">
              <img src={brandLogo} alt="Projex" className="h-8 w-8" />
              <span className="text-xl font-bold text-[#1A1A2E] dark:text-white">Projex</span>
            </a>
            <p className="mt-4 text-[#4A4A68] dark:text-[#9CA3AF] text-sm max-w-xs">
              The modern project management tool for teams who want clarity,
              speed, and simplicity.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#F8F9FC] dark:bg-[#2D2D44] flex items-center justify-center text-[#6B7280] hover:text-[#F97316] hover:bg-[#F97316]/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-[#1A1A2E] dark:text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#F97316] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#E5E7EB] dark:border-[#2D2D44] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            &copy; 2025 Projex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-[#6B7280] hover:text-[#F97316] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-[#6B7280] hover:text-[#F97316] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
