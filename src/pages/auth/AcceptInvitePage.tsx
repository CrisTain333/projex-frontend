import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ArrowRight, Users, Check, XCircle } from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";

interface InviteData {
  teamName: string;
  teamLogo?: string;
  inviterName: string;
  inviterEmail: string;
  role: string;
}

const passwordRequirements = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "uppercase", label: "One uppercase letter", regex: /[A-Z]/ },
  { id: "lowercase", label: "One lowercase letter", regex: /[a-z]/ },
  { id: "number", label: "One number", regex: /[0-9]/ },
];

export function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching invite data
    if (token) {
      setTimeout(() => {
        // TODO: Implement actual invite validation
        if (token === "invalid") {
          setIsInvalidToken(true);
        } else {
          setInviteData({
            teamName: "Acme Corporation",
            inviterName: "John Smith",
            inviterEmail: "john@acme.com",
            role: "Member",
          });
        }
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
      setIsInvalidToken(true);
    }
  }, [token]);

  const checkRequirement = (regex: RegExp) => regex.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement accept invite logic
    console.log("Accept invite:", { token, name, password });
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    }, 1500);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#F8F9FC] dark:bg-[#0F0F1A]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6">
            <div className="w-full h-full border-4 border-[#F97316]/20 border-t-[#F97316] rounded-full animate-spin" />
          </div>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">Loading invitation...</p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (isInvalidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#F8F9FC] dark:bg-[#0F0F1A]">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={brandLogo} alt="Projex" className="h-10 w-10 sm:h-12 sm:w-12" />
              <span className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white">
                Projex
              </span>
            </Link>
          </div>
          <div className="bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-xl border border-[#E5E7EB] dark:border-[#2D2D44] p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#EF4444]/10 rounded-full flex items-center justify-center">
              <XCircle className="w-10 h-10 text-[#EF4444]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              Invalid invitation
            </h2>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF] mb-8">
              This invitation link is invalid or has expired. Please ask the team admin to send a new invitation.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all"
            >
              Go to sign in
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
          {/* Invite Info */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#F97316] to-[#EC4899] rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] dark:text-white mb-2">
              You're invited!
            </h1>
            <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
              <span className="font-medium text-[#1A1A2E] dark:text-white">
                {inviteData?.inviterName}
              </span>{" "}
              has invited you to join
            </p>
          </div>

          {/* Team Card */}
          <div className="mb-6 p-4 bg-[#F8F9FC] dark:bg-[#2D2D44] rounded-xl border border-[#E5E7EB] dark:border-[#3D3D54]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {inviteData?.teamName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[#1A1A2E] dark:text-white">
                  {inviteData?.teamName}
                </p>
                <p className="text-sm text-[#6B7280]">
                  Joining as {inviteData?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
              >
                Your name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-[#6B7280]" />
                </div>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5"
              >
                Create password
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
                  placeholder="Create a strong password"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Accept & join team
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="mt-6 text-xs text-center text-[#6B7280]">
            By accepting this invitation, you agree to our{" "}
            <Link to="/terms" className="text-[#F97316] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-[#F97316] hover:underline">
              Privacy Policy
            </Link>
          </p>

          {/* Already have account */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB] dark:border-[#2D2D44] text-center">
            <p className="text-sm text-[#4A4A68] dark:text-[#9CA3AF]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#F97316] hover:text-[#EA580C] font-medium"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptInvitePage;
