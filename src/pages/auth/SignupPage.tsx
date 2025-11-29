import { useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "@/assets/brand_logo.png";

export function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log("Signup:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] dark:bg-[#0F0F1A] px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={brandLogo} alt="Projex" className="h-12 w-12" />
            <span className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
              Projex
            </span>
          </Link>
        </div>

        {/* Signup Card */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg border border-[#E5E7EB] dark:border-[#2D2D44] p-8">
          <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-6">
            Start managing projects with your team
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] transition-colors"
                required
              />
              <p className="mt-1.5 text-xs text-[#6B7280]">
                Must be at least 8 characters
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-md hover:shadow-lg"
            >
              Create account
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-[#6B7280]">
            By signing up, you agree to our{" "}
            <Link to="/terms" className="text-[#F97316] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#F97316] hover:underline">
              Privacy Policy
            </Link>
          </p>

          <div className="mt-6 text-center">
            <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#F97316] hover:text-[#EA580C] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
