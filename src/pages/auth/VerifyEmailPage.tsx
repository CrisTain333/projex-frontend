import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, ArrowRight, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";

type VerificationStatus = "verifying" | "success" | "error" | "expired";

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (token) {
      // Simulate verification
      const timer = setTimeout(() => {
        // TODO: Implement actual verification logic
        // For demo, randomly succeed or fail
        setStatus(Math.random() > 0.3 ? "success" : "error");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setStatus("expired");
    }
  }, [token]);

  const handleResend = async () => {
    setIsResending(true);
    // TODO: Implement resend logic
    setTimeout(() => {
      setIsResending(false);
      alert("Verification email sent!");
    }, 1000);
  };

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-6">
              <div className="w-full h-full border-4 border-[#F97316]/20 border-t-[#F97316] rounded-full animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              Verifying your email
            </h2>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#10B981]/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#10B981]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              Email verified!
            </h2>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-8">
              Your email has been successfully verified. You can now access all features of Projex.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg"
            >
              Go to Dashboard
              <ArrowRight size={18} />
            </Link>
          </div>
        );

      case "error":
        return (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-[#EF4444]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              Verification failed
            </h2>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-8">
              We couldn't verify your email. The link may be invalid or something went wrong.
            </p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg disabled:opacity-70"
            >
              {isResending ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <>
                  Resend verification email
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        );

      case "expired":
        return (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
              <Mail className="w-10 h-10 text-[#F59E0B]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              Link expired or invalid
            </h2>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-8">
              This verification link has expired or is invalid. Please request a new verification email.
            </p>
            <button
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg disabled:opacity-70"
            >
              {isResending ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <>
                  Send new verification email
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        );
    }
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
          {renderContent()}

          {/* Back to Login - show only when not verifying */}
          {status !== "verifying" && (
            <div className="mt-6 pt-6 border-t border-[#E5E7EB] dark:border-[#2D2D44] text-center">
              <Link
                to="/login"
                className="text-sm text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white transition-colors"
              >
                Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
