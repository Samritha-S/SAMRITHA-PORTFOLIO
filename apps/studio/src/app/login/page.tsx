"use client";

import React, { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      setError("Incorrect password. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d13] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#C9A24B]/15 border border-[#C9A24B]/50 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#C9A24B]" />
          </div>
          <h1 className="text-white font-semibold text-xl tracking-wide">Samritha Studio</h1>
          <p className="text-[#8b949e] text-xs mt-1 font-mono">Private Content Management</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-[#8b949e] mb-1.5 font-mono">Studio Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your studio password"
                autoFocus
                required
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#0d1117] border border-[#30363d] text-white text-sm font-mono focus:outline-none focus:border-[#C9A24B]/60 transition-colors placeholder-[#484f58]"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white transition-colors cursor-pointer"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-mono">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-[#C9A24B] text-[#0c1117] font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Verifying…" : "Enter Studio"}
          </button>
        </form>

        <p className="text-center text-[#484f58] text-[10px] font-mono mt-6">
          This interface is private and not indexed by search engines.
        </p>
      </div>
    </div>
  );
}
