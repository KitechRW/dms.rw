"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setEmailError("");
setPasswordError("");

let hasError = false;

if (!email.trim()) {
  setEmailError("Email is required");
  hasError = true;
} else if (!/\S+@\S+\.\S+/.test(email)) {
  setEmailError("Enter a valid email address");
  hasError = true;
}

if (!password.trim()) {
  setPasswordError("Password is required");
  hasError = true;
}

if (hasError) {
  setLoading(false);
  return;
}

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, keepSignedIn, }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        
        login(data.user, keepSignedIn);

        
        if (data.user.role === "admin") {
  router.push("/admin/dashboard");
} else if (data.user.role === "operator") {
  router.push("/operator/dashboard");
} else if (data.user.role === "farmer") {
  router.push("/farmer/dashboard");
} else {
  setError("Unknown user role");
}
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm sm:max-w-md overflow-hidden rounded-1xl shadow-md">
  <div className="bg-blue-50 py-8 text-center">
    <h1 className="text-5xl font-bold text-blue-900">DMS.rw</h1>
    <p className="text-gray-600 mt-2">Sign in to DMS.rw</p>
  </div>

      <form
        onSubmit={handleLogin}
        className="bg-white p-4 sm:p-10 rounded-1xl shadow-md w-full"
      >

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

      
        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <div className="relative">
    <FaUserCircle
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    />
          <input
            type="email"
            placeholder="operator@dms.rw"
            value={email}
            onChange={(e) => {setEmail(e.target.value);
  setEmailError("");
}}
            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-200"
            required
          />
          </div>

         { emailError && (
  <p className="text-red-500 text-sm mt-1">
    {emailError}
  </p>
)}
        </div>

        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Password</label>
            <Link
              href="/forgot-password"
              className="text-sm text-blue-700 hover:text-sky-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
             <Lock
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => {setPassword(e.target.value);
  setPasswordError("");
}}
              className="w-full pl-10 pr-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <button type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>

            
          </div>
          {passwordError && (
  <p className="text-red-500 text-sm mt-1">
    {passwordError}
  </p>
)}
        </div>
        <div className="flex items-center gap-2 mb-6">
  <input
    type="checkbox"
    id="keepSignedIn"
    checked={keepSignedIn}
    onChange={(e) => setKeepSignedIn(e.target.checked)}
  />
  <label htmlFor="keepSignedIn" className="text-sm">
    Keep me signed in
  </label>
</div>

 <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-800 to-blue-900 hover:from-sky-500 hover:to-sky-700"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
    <LogIn size={18} />
    <span>{loading ? "Signing in..." : "Sign in"}</span>
  </div>
        </button>
      </form>
      <div className="bg-blue-50 py-6 flex items-center justify-center gap-2 text-sm text-gray-500">
  <ShieldCheck size={16} />
  <span>Secure connection</span>
</div>
    </div>
    </div>
  );
}