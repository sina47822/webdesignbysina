'use client'
import OtpInput from "@/components/Dashboard/OTPInput";
import OtpInputShadcn from "@/components/Dashboard/OtpInputShadcn";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

export default function OTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // "email" یا "phone"
  const identifier = searchParams.get("identifier");

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

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
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">تایید {type === "email" ? "ایمیل" : "شماره موبایل"}</h1>
      <input
        type="text"
        placeholder="کد ۵ رقمی را وارد کنید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleVerify}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "در حال بررسی..." : "تایید"}
      </button>
    </div>
  );
}