import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo = `${location.state ? location.state : "/"}`;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      toast.success("You're logged in!");
      navigate(redirectTo);
    } catch (err) {
      // map a few common auth errors to friendlier messages
      const code = err?.code || err?.message || "unknown";
      let message = "Failed to sign in.";
      if (
        code.includes("auth/wrong-password") ||
        code.includes("wrong-password")
      ) {
        message = "Incorrect password. Please try again.";
      } else if (
        code.includes("auth/user-not-found") ||
        code.includes("user-not-found")
      ) {
        message = "No account found for this email.";
      } else if (code.includes("auth/too-many-requests")) {
        message = "Too many attempts. Try again later.";
      } else if (typeof code === "string") {
        message = code;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("You're logged in!");
      navigate(redirectTo);
    } catch (err) {
      setError(err?.code || err?.message || "Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-black via-gray-900 to-black p-6 pt-20">
      <div className="max-w-5xl w-full bg-white/5 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left — Illustration */}
        <div className="hidden lg:flex flex-col justify-center px-12 py-10 bg-linear-to-br from-[#0f172a]/60 to-[#0b1220]/40">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Welcome back
          </h2>
          <p className="text-gray-300 mb-8">
            Sign in to continue to Movie Master Pro — your movies & community
            hub.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
              <p className="text-sm text-gray-300">
                Fast, secure sign-in using your account. We never share your
                password.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5">
              <p className="text-sm text-gray-300">
                Prefer Quick Sign-in? Use Google to get started in seconds.
              </p>
            </div>
          </div>

          <div className="mt-auto pt-8 text-gray-400 text-sm">
            Need an account?{" "}
            <Link to="/register" className="text-[#E63A3A] hover:underline">
              Create one
            </Link>
          </div>
        </div>

        {/* Right — Form */}
        <div className="px-8 py-10 sm:px-12 bg-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sign in to your account
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Enter your credentials to access your dashboard.
            </p>

            <form
              onSubmit={handleSignIn}
              className="space-y-4"
              aria-label="Sign in form"
            >
              {error && (
                <div
                  role="alert"
                  className="text-sm text-red-600 bg-red-50 p-3 rounded"
                >
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-2 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#4DA1FF] focus:ring-2 focus:ring-[#4DA1FF]/30"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 focus:border-[#E63A3A] focus:ring-2 focus:ring-[#E63A3A]/25"
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-600 px-2"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password", {
                      state: {
                        email:
                          document.querySelector('input[name="email"]')
                            ?.value || "",
                      },
                    })
                  }
                  className="text-sm text-[#1C75FF] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md py-2 text-white font-semibold bg-linear-to-r from-[#1C75FF] to-[#4DA1FF] shadow hover:scale-[1.02] transition-transform"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <div className="text-xs text-gray-400">or continue with</div>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-3 rounded-md px-4 py-2 border border-gray-200 bg-white hover:shadow transition"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                By continuing you agree to our{" "}
                <Link to="/terms" className="text-[#E63A3A] hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#E63A3A] hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
