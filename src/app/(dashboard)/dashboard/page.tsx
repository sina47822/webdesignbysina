"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", username: "" });

  // دریافت اطلاعات کاربر
  const fetchUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/signin");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.push("/signin");
        return;
      }

      const data = await res.json();
      setUser(data);
      setFormData({ name: data.name || "", phone: data.phone || "", email: data.email || "", username: data.username || "" });
    } catch (error) {
      router.push("/signin");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ثبت تغییرات
  const handleSave = async () => {
    const token = localStorage.getItem("access");
    if (!token) return;

    setLoading(true);
    const res = await fetch(`${API_BASE}/api/auth/user/`, {
      method: "PATCH", // یا "PUT" بسته به API
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (res.ok) {
      const updatedUser = await res.json();
      setUser(updatedUser);
      setEditMode(false);
      alert("اطلاعات با موفقیت بروزرسانی شد");
    } else {
      const data = await res.json();
      alert(data.detail || "خطا در بروزرسانی اطلاعات");
    }
  };

    // ارسال کد تایید
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

  if (loading || !user) return <p>در حال بارگذاری...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl mb-4">
        خوش آمدید،
        {user.name ? (
          ` ${user.name}`
        ) : (
          ` ${user.email || user.phone}`
        )
        }
      </h1>

      {!editMode ? (
        <>
          <div className="space-y-2">
            <p>نام: {user.name || "ثبت نشده"}</p>
            <p>ایمیل: {user.email || "ثبت نشده"}</p>
            <p>شماره موبایل: {user.phone || "ثبت نشده"}</p>
            <p>شماره موبایل تایید شده: {user.is_phone_verified ? "✅" : "❌"}</p>
            <p>ایمیل تایید شده: {user.is_email_verified ? "✅" : "❌"}</p>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setEditMode(true)}
            >
              ویرایش اطلاعات
            </button>
            {/* دکمه‌های تایید */}
            {!user.is_phone_verified && (
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleSendToken('phone')}
              >
                تایید شماره موبایل
              </button>
            )}

            {!user.is_email_verified && (
              <button
                className="mt-2 ml-2 bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleSendToken('email')}
              >
                تایید ایمیل
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="نام"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            placeholder="شماره موبایل"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            placeholder="نام کاربری"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="border p-2 w-full mb-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleSave}
            >
              ذخیره
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setEditMode(false)}
            >
              لغو
            </button>
          </div>
        </>
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
