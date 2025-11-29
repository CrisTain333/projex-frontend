import { useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "@/assets/brand_logo.png";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] dark:bg-[#0F0F1A] px-4">
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

        {/* Login Card */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl shadow-lg border border-[#E5E7EB] dark:border-[#2D2D44] p-8">
          <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#1A1A2E] dark:text-white"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#F97316] hover:text-[#EA580C] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-md hover:shadow-lg"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#F97316] hover:text-[#EA580C] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
