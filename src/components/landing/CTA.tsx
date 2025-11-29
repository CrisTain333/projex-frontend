import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 bg-[#1A1A2E] dark:bg-[#0F0F1A] relative overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#F97316]/20 to-[#EC4899]/20 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Ready to transform how your{" "}
          <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
            team works?
          </span>
        </h2>

        <p className="mt-6 text-lg text-[#9CA3AF] max-w-2xl mx-auto">
          Join thousands of teams already using Projex to ship faster and work
          smarter.
        </p>

        {/* Email Input + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-4 rounded-lg bg-[#2D2D44] dark:bg-[#1A1A2E] border border-[#4A4A68] dark:border-[#2D2D44] text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] transition-colors"
          />
          <button className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap">
            Get Started
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Trust Note */}
        <p className="mt-6 text-sm text-[#6B7280]">
          Free forever for small teams. No credit card required.
        </p>
      </div>
    </section>
  );
}
