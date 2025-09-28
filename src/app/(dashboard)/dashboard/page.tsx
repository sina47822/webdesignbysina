"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/signin");
      return;
    }

    fetch(`${API_BASE}/api/auth/user/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          router.push("/signin");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => router.push("/signin"));
  }, [router]);

  const handleSendToken = async (type: 'email' | 'phone') => {
    const identifier = type === 'email' ? user.email : user.phone;

    const res = await fetch(`${API_BASE}/api/auth/send-token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, purpose: 'verify' }),
    });

    if (res.ok) {
      router.push(`/OTP?type=${type}&identifier=${identifier}`);
    } else {
      const data = await res.json();
      alert(data.detail || 'خطا در ارسال کد');
    }
  };

  if (!user) return <p>در حال بارگذاری...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl">خوش آمدید، {user.username || user.phone}</h1>
      <p>ایمیل: {user.email || "ثبت نشده"}</p>
      <p>شماره موبایل: {user.phone || "ثبت نشده"}</p>
      <p>یوزرنیم: {user.username || "ثبت نشده"}</p>
      <p>اسم: {user.name || "ثبت نشده"}</p>
      <p>یوزرنیم: {user.username || "ثبت نشده"}</p>
      <p>یوزرنیم: {user.username || "ثبت نشده"}</p>
      <p>شماره موبایل تایید شده: {user.is_phone_verified ? "بله" : "خیر"}</p>
      <p>ایمیل تایید شده: {user.is_email_verified ? "بله" : "خیر"}</p>

      {/* دکمه‌های تایید */}
      {!user.is_phone_verified && (
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() =>  handleSendToken('phone')}
        >
          تایید شماره موبایل
        </button>
      )}

      {!user.is_email_verified && (
        <button
          className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() =>  handleSendToken('email')}
        >
          تایید ایمیل
        </button>
      )}

      <button
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          router.push("/signin");
        }}
      >
        خروج
      </button>
    </div>
  );
}
