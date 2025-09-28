"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function OTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // email | phone
  const identifier = searchParams.get("identifier");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60); // 60 ثانیه تا ارسال مجدد

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (!type || !identifier) return;
    setLoading(true);
    const res = await fetch(`${API_BASE}/api/auth/verify-token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, code, purpose: type }),
    });
    setLoading(false);

    if (res.ok) {
      alert("تایید با موفقیت انجام شد");
      router.push("/dashboard");
    } else {
      const data = await res.json();
      alert(data.detail || "خطا در تایید");
    }
  };

  const handleResend = async () => {
    const res = await fetch(`${API_BASE}/api/auth/send-token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, purpose: "verify" }),
    });
    if (res.ok) {
      alert("کد جدید ارسال شد");
      setTimer(60);
    } else {
      const data = await res.json();
      alert(data.detail || "خطا در ارسال مجدد کد");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-background shadow-md rounded-lg">
      <h1 className="text-xl mb-4">تایید {type === "email" ? "ایمیل" : "شماره موبایل"}</h1>
      <input
        type="text"
        placeholder="کد ۵ رقمی را وارد کنید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        className="bg-blue-500 text-background px-4 py-2 rounded w-full mb-2 hover:bg-blue-600"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "در حال بررسی..." : "تایید"}
      </button>
      <button
        className={`w-full px-4 py-2 rounded ${timer > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-background`}
        onClick={handleResend}
        disabled={timer > 0}
      >
        ارسال دوباره کد {timer > 0 ? `(${timer}s)` : ""}
      </button>
    </div>
  );
}
