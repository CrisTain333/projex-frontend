import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, ArrowRight, CheckCircle, Check } from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";

const passwordRequirements = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "uppercase", label: "One uppercase letter", regex: /[A-Z]/ },
  { id: "lowercase", label: "One lowercase letter", regex: /[a-z]/ },
  { id: "number", label: "One number", regex: /[0-9]/ },
];

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const checkRequirement = (regex: RegExp) => regex.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const allRequirementsMet = passwordRequirements.every((req) =>
      checkRequirement(req.regex)
    );

    if (!allRequirementsMet) {
      setError("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    // TODO: Implement reset password logic
    console.log("Reset password:", { token, password });
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  // Invalid or expired token state
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#F8F9FC] dark:bg-[#0F0F1A]">
        <div className="w-full max-w-md text-center">
          <div className="bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-xl border border-[#E5E7EB] dark:border-[#2D2D44] p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#EF4444]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              Invalid reset link
            </h2>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all"
            >
              Request new link
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                  <Lock className="w-8 h-8 text-[#F97316]" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white mb-2">
                  Set new password
                </h1>
                <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
                  Your new password must be different from previously used passwords.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-sm">
                    {error}
                  </div>
                )}

                {/* New Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-[#6B7280]" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#4A4A68] dark:hover:text-[#9CA3AF]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {password && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {passwordRequirements.map((req) => (
                        <div
                          key={req.id}
                          className={`flex items-center gap-2 text-xs ${
                            checkRequirement(req.regex)
                              ? "text-[#10B981]"
                              : "text-[#6B7280]"
                          }`}
                        >
                          <Check
                            size={14}
                            className={
                              checkRequirement(req.regex) ? "opacity-100" : "opacity-30"
                            }
                          />
                          {req.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-[#6B7280]" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className={`w-full pl-10 pr-12 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 transition-all ${
                        confirmPassword && password !== confirmPassword
                          ? "border-[#EF4444] focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
                          : "border-[#E5E7EB] dark:border-[#3D3D54] focus:ring-[#F97316]/20 focus:border-[#F97316]"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#4A4A68] dark:hover:text-[#9CA3AF]"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1.5 text-xs text-[#EF4444]">
                      Passwords do not match
                    </p>
                  )}
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
                      Reset password
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
                Password reset successful
              </h2>
              <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-6">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all"
              >
                Continue to sign in
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
