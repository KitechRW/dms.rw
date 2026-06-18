"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaLock, FaShieldAlt, FaSignInAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

const frontendUsers = [
  {
    _id: "1",
    first_name: "Operator",
    last_name: "User",
    email: "operator@dms.rw",
    password: "password",
    role: "operator",
  },
  {
    _id: "2",
    first_name: "Admin",
    last_name: "User",
    email: "admin@dms.rw",
    password: "password",
    role: "admin",
  },
  {
    _id: "3",
    first_name: "Farmer",
    last_name: "User",
    email: "farmer@dms.rw",
    password: "password",
    role: "farmer",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      toast.error("Email is required");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      toast.error("Enter a valid email address");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      toast.error("Password is required");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const foundUser = frontendUsers.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      toast.error("Invalid email or password");
      setLoading(false);
      return;
    }

    const { password: _password, ...user } = foundUser;

    login(user);

    if (user.role === "farmer") {
      router.push("/farmer");
    } else if (user.role === "operator") {
      router.push("/operator");
    } else {
      router.push("/admin/dashboard");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] px-3 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-white shadow-[0_0_18px_rgba(15,23,42,0.06)]">
        <header className="bg-[#eef1ff] px-5 py-8 text-center sm:py-10">
          <h1 className="text-4xl font-extrabold tracking-normal text-[#082b73]">
            DMS.rw
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-600">
            Sign in to DMS.rw
          </p>
        </header>

        <form onSubmit={handleLogin} className="flex-1 px-6 py-8 sm:px-8">
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Email
            </label>

            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-slate-400" />
              <input
                type="email"
                placeholder="operator@dms.rw"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#082b73] focus:ring-4 focus:ring-blue-100"
                required
              />
            </div>

            {emailError && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {emailError}
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between gap-4">
              <label className="text-sm font-bold text-slate-800">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-blue-500 transition hover:text-[#082b73]"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#082b73] focus:ring-4 focus:ring-blue-100"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition hover:text-[#082b73]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <FaEye />
              </button>
            </div>

            {passwordError && (
              <p className="mt-2 text-sm font-medium text-red-500">
                {passwordError}
              </p>
            )}
          </div>

          <div className="mb-6 flex items-center gap-3">
            <input
              type="checkbox"
              id="keepSignedIn"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 text-[#082b73] focus:ring-[#082b73]"
            />
            <label htmlFor="keepSignedIn" className="text-sm text-slate-600">
              Keep me signed in
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`flex h-12 w-full items-center justify-center gap-3 rounded-lg text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition ${
              loading
                ? "cursor-not-allowed bg-slate-400"
                : "bg-[#082b73] hover:bg-[#0b3a94]"
            }`}
          >
            <FaSignInAlt className="text-lg" />
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <footer className="flex h-16 items-center justify-center gap-3 border-t border-slate-100 bg-[#eef1ff] text-sm font-medium text-slate-400">
          <FaShieldAlt />
          <span>Secure connection</span>
        </footer>
      </div>
    </div>
  );
}
