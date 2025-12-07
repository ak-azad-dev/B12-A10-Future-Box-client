import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const { createUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  function calcPasswordStrength(pw = "") {
    let score = 0;
    if (pw.length >= 6) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[a-z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;
    return score; // 0 - 5
  }

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError("");

    const displayName = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photoURL = e.target.photo.value.trim();
    const password = e.target.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must:\n• Contain at least one uppercase letter\n• Contain at least one lowercase letter\n• Be at least 6 characters long"
      );
      return;
    }

    setLoading(true);
    try {
      //const result = await createUser(displayName, email, photoURL, password);
      await createUser(displayName, email, photoURL, password);
      toast.success("You're registered successfully!");
      navigate("/");
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleRegisterWithGoogle = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("You're logged in!");
      navigate("/");
    } catch (err) {
      setError(err?.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#06070a] via-[#071226] to-[#0b1020] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Banner */}
        <div className="hidden lg:flex flex-col justify-center gap-6 p-8 rounded-2xl bg-[linear-gradient(135deg,#0f1724_0%,#0b1220_100%)] shadow-2xl border border-white/5">
          <h2 className="text-4xl font-extrabold text-white">
            Welcome to MovieMaster Pro
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Join the community to track your favorite movies, create
            collections, and discover curated recommendations. Fast sign up — no
            fuss.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E63A3A]" />
              Personalized recommendations
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4DA1FF]" />
              Create & share collections
            </li>
            <li className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FFD36A]" />
              Sync across devices
            </li>
          </ul>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            Create your account
          </h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            Fast sign up — start exploring movies today.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-md p-3 border border-red-100">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                name="name"
                required
                className="mt-2 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#4DA1FF] focus:ring-2 focus:ring-[#4DA1FF]/30"
                placeholder="John Doe"
                autoComplete="name"
              />
            </div>

            {/* Email */}
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

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                name="photo"
                type="url"
                className="mt-2 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-[#4DA1FF] focus:ring-2 focus:ring-[#4DA1FF]/30"
                placeholder="https://..."
                autoComplete="photo"
              />
            </div>

            {/* Password */}
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
                  placeholder="Create a password"
                  onChange={(e) => {
                    const pw = e.target.value;
                    setPasswordStrength(calcPasswordStrength(pw));

                    // Real-time validation
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
                    if (!passwordRegex.test(pw)) {
                      setPasswordError(
                        "Password must:\n• Contain at least one uppercase letter\n• Contain at least one lowercase letter\n• Be at least 6 characters long"
                      );
                    } else {
                      setPasswordError("");
                    }
                  }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600 px-2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error message */}
              {passwordError && (
                <div className="text-sm text-red-600 mt-2 whitespace-pre-line">
                  {passwordError}
                </div>
              )}

              {/* Password Strength Bar */}
              <div className="mt-3">
                <div className="h-2 w-full bg-gray-100 rounded overflow-hidden">
                  <div
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    className={`h-full rounded transition-all ${
                      passwordStrength <= 2
                        ? "bg-red-400"
                        : passwordStrength === 3
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Password strength:{" "}
                  {passwordStrength <= 2
                    ? "Weak"
                    : passwordStrength === 3
                    ? "Medium"
                    : "Strong"}
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-linear-to-r from-[#E63A3A] to-[#F25A3C] text-white font-semibold shadow hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              {loading ? "Creating..." : "Register"}
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleRegisterWithGoogle}
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

            {/* Sign in link */}
            <div className="text-center pt-2">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
              </span>
              <a href="/sign-in" className="text-[#E63A3A] font-semibold">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
