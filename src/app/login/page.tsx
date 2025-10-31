"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import { getCurrentUser, login } from "@/lib/api";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { refetch } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("Please enter email and password.");
    }

    try {
      setLoading(true);
      await login(email, password);

      const data = await getCurrentUser();
      await refetch();
      await new Promise((resolve) => setTimeout(resolve, 100));
      router.push(data.user.role === "admin" ? "/admin" : "/store");
      // window.location.href = data.user.role === "admin" ? "/admin" : "/store";
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex items-center justify-center">
        <div className="flex w-full max-w-5xl mx-auto rounded-2xl shadow-lg overflow-hidden bg-white dark:bg-gray-800">
          {/* Info Login */}
          <div className="w-1/2 bg-gray-100 dark:bg-gray-800 p-10 flex flex-col justify-center border-l border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-center text-indigo-600 dark:text-indigo-400">Demo Login Info</h2>

            <div className="flex justify-between text-sm">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Admin Account:</h3>
                <p>email: admin@mail.com</p>
                <p>password: admin123</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">Customer Account:</h3>
                <p>email: john@mail.com</p>
                <p>password: changeme</p>
              </div>
            </div>
          </div>
          {/* Form Login */}
          <div className="flex-1 p-10 flex flex-col justify-center">
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
        </div>
      </main>
    </div>
  );
}
