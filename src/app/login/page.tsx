"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import { getCookie, isAuthenticated, setCookie } from "@/lib/auth";
import { getCurrentUser, login } from "@/lib/api";
import { set } from "react-hook-form";
import Loading from "@/components/Loading";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated()) {
      if (getCookie("role") === "admin") {
        router.push("/admin");
      } else {
        router.push("/store");
      }
    }
  }, [router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Contoh validasi sederhana
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);

      setCookie("access_token", data.access_token, 30);
      setCookie("refresh_token", data.refresh_token, 30);

      const user = await getCurrentUser();
      setCookie("email", user.email, 30);
      setCookie("role", user.role, 30);
      setCookie("name", user.name, 30);

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/store");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">Login</h1>

          {error && <div className="mb-4 text-red-600 dark:text-red-400 text-sm font-medium text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md mt-2">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
