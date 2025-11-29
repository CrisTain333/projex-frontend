import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement forgot password logic
    console.log("Forgot password:", { email });
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#F8F9FC] dark:bg-[#0F0F1A]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={brandLogo} alt="Projex" className="h-10 w-10 sm:h-12 sm:w-12" />
            <span className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white">
              Projex
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-xl border border-[#E5E7EB] dark:border-[#2D2D44] p-6 sm:p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#F97316]/10 to-[#EC4899]/10 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-[#F97316]" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white mb-2">
                  Forgot password?
                </h1>
                <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
                  No worries, we'll send you reset instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-[#6B7280]" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#10B981]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
                Check your email
              </h2>
              <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-6">
                We've sent a password reset link to
                <br />
                <span className="font-medium text-[#1A1A2E] dark:text-white">
                  {email}
                </span>
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm text-[#6B7280] hover:text-[#4A4A68] dark:hover:text-[#9CA3AF]"
              >
                Didn't receive the email?{" "}
                <span className="text-[#F97316] font-medium">Click to resend</span>
              </button>
            </div>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
