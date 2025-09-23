// app/pricing/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

type Plan = {
  name: "Basic" | "Standard" | "Premium";
  price: string;
  description: string;
  hours: string;
  response: string;
  communication: string;
  coverage: string;
  reporting: string;
  sla: string;
  extras: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: "۳,۰۰۰,۰۰۰ تومان / ماه",
    description:
      "برای کسب‌وکارهای کوچک یا استارتاپ‌ها که نیاز به پشتیبانی محدود دارند.",
    hours: "۲۰ ساعت در ماه",
    response: "حداکثر ۲۴ ساعت",
    communication: "ایمیل / تیکت",
    coverage: "رفع اشکالات عمومی نرم‌افزاری",
    reporting: "گزارش ماهانه",
    sla: "بدون تضمین خاص",
    extras: "—",
  },
  {
    name: "Standard",
    price: "۶,۰۰۰,۰۰۰ تومان / ماه",
    description:
      "برای شرکت‌هایی که فعالیت روزانه و نیازهای پشتیبانی بیشتری دارند.",
    hours: "۵۰ ساعت در ماه",
    response: "حداکثر ۸ ساعت",
    communication: "ایمیل / تیکت / تلفن",
    coverage: "پشتیبانی نرم‌افزاری + به‌روزرسانی‌های دوره‌ای",
    reporting: "گزارش دو هفته‌ای",
    sla: "SLA سطح نقره‌ای (۹۵٪)",
    extras: "آموزش اولیه کارکنان",
    popular: true,
  },
  {
    name: "Premium",
    price: "۱۲,۰۰۰,۰۰۰ تومان / ماه",
    description:
      "برای سازمان‌های بزرگ و پروژه‌های حساس که نیاز به پشتیبانی فوری دارند.",
    hours: "نامحدود (در حد SLA)",
    response: "حداکثر ۱ ساعت",
    communication: "ایمیل / تیکت / تلفن / چت فوری",
    coverage: "پشتیبانی کامل (فنی + نرم‌افزاری + مشاوره زیرساخت)",
    reporting: "گزارش هفتگی + داشبورد آنلاین",
    sla: "SLA سطح طلایی (۹۹٪)",
    extras: "مانیتورینگ ۲۴/۷ + مدیر حساب اختصاصی",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "چرا پلن Premium گران‌تر است؟",
    answer:
      "به‌دلیل SLA سطح طلایی، مانیتورینگ ۲۴/۷، زمان پاسخ‌گویی ۱ ساعته و مدیر حساب اختصاصی که مستلزم تیم باتجربه‌تر و منابع بیشتر است.",
  },
  {
    question: "آیا امکان خرید ساعت اضافه وجود دارد؟",
    answer:
      "بله. در پلن Basic و Standard امکان خرید ساعات اضافه با تعرفه مشخص فراهم است و در قرارداد درج می‌شود.",
  },
  {
    question: "آیا قراردادها قابل شخصی‌سازی هستند؟",
    answer:
      "برای مشتریان سازمانی می‌توان SLA سفارشی، سطوح دسترسی، گزارش‌های اختصاصی و رویه‌های تغییرات (Change Management) را شخصی‌سازی کرد.",
  },
  {
    question: "آیا آموزش کارمندان هم شامل می‌شود؟",
    answer:
      "در پلن Standard آموزش اولیه و در پلن Premium آموزش کامل‌تر، مستندسازی و مشاوره زیرساخت ارائه می‌شود.",
  },
  {
    question: "چه چیزهایی خارج از محدوده پشتیبانی است؟",
    answer:
      "توسعه قابلیت‌های جدید، رفع مشکلات مربوط به سیستم‌های خارج از قرارداد، و پروژه‌های مهاجرت بزرگ معمولاً در قالب سفارش جداگانه انجام می‌شود.",
  },
];

const responsibilities: string[] = [
  "✅ پاسخگویی به مشکلات نرم‌افزاری و فنی در محدوده قرارداد",
  "✅ ارائه گزارش‌های دوره‌ای بر اساس پلن انتخابی",
  "✅ نصب و به‌روزرسانی نرم‌افزارها در صورت نیاز",
  "✅ مانیتورینگ سلامت سرویس‌ها (در پلن Premium)",
  "✅ مشاوره بهبود زیرساخت (Premium)",
  "❌ توسعه نرم‌افزار جدید جزو وظایف پشتیبانی نیست",
  "❌ رفع مشکلات سیستم‌های خارج از قرارداد مشمول هزینه جداگانه است",
];

const glossary: { term: string; meaning: string }[] = [
  {
    term: "SLA (توافق‌نامه سطح خدمات)",
    meaning:
      "قرار‌دادی که زمان پاسخ‌گویی، زمان حل مشکل، ساعات پوشش، و شاخص‌های کیفیت را مشخص می‌کند. سخت‌گیرانه‌تر بودن SLA معمولاً قیمت را بالاتر می‌برد.",
  },
  {
    term: "زمان پاسخ‌گویی (Response Time)",
    meaning:
      "حداکثر زمانی که تیم پشتیبانی پس از ثبت تیکت برای شروع رسیدگی با شما تماس می‌گیرد یا اقدام می‌کند.",
  },
  {
    term: "MTTR (میانگین زمان تا رفع)",
    meaning:
      "میانگین مدت‌زمان لازم برای حل مشکلات از زمان تشخیص تا رفع کامل؛ شاخص مهم کیفیت پشتیبانی است.",
  },
  {
    term: "Severity (شدت حادثه)",
    meaning:
      "درجه اهمیت یک مشکل. برای مثال Sev1 یعنی توقف سرویس حیاتی و رسیدگی فوری لازم است.",
  },
  {
    term: "مانیتورینگ ۲۴/۷",
    meaning:
      "پایش مداوم سرویس‌ها شبانه‌روز با ابزارهای تخصصی برای کشف پیش‌دستانه خطاها و کاهش زمان قطعی.",
  },
  {
    term: "Change Management",
    meaning:
      "رویه کنترل‌شده برای اعمال تغییرات روی سیستم‌ها (برنامه‌ریزی، بازبینی، تأیید و بازگشت در صورت خطا) برای کاهش ریسک.",
  },
  {
    term: "Runbook / Playbook",
    meaning:
      "مستندات گام‌به‌گام برای رفع سریع خطاهای رایج و سناریوهای اضطراری.",
  },
  {
    term: "On-call",
    meaning:
      "آماده‌باش خارج از ساعات اداری برای پاسخ به رخدادها؛ هزینه و شیفت‌بندی آن باید در قرارداد روشن باشد.",
  },
];

export default function PricingPage() {
  const [selected, setSelected] = useState<Plan["name"] | null>("Standard");

  // اختیاری: هماهنگی اولیه با سیستم/ترجیح کاربر
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (!root.classList.contains("dark")) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) root.classList.add("dark");
    }
  }, []);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.name === selected) ?? null,
    [selected]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 py-24 px-6">
      {/* Theme Toggle */}
      {/* <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="rounded-full px-4 py-2 text-sm bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow"
          aria-label="Toggle dark mode"
        >
          <span className="hidden dark:inline">☀️ حالت روشن</span>
          <span className="inline dark:hidden">🌙 حالت تیره</span>
        </button>
      </div> */}

      {/* Hero */}
      <section className="relative overflow-hidden mb-12">
        {/* پس‌زمینه گرادیانی تزئینی */}
        <div className="absolute inset-0 " />
        <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* متن معرفی */}
            <div className="order-2 md:order-1 text-center md:text-right">
              <h1 className="text-4xl font-bold mb-4">پلن‌های خدمات پشتیبانی</h1>
              <p className="text-gray-600 dark:text-gray-300 leading-8">
                خدمات پشتیبانی فنی، نرم‌افزاری و مشتریان را در سه سطح ارائه می‌کنیم تا بر اساس
                نیاز و بودجه، بهترین انتخاب را داشته باشید. قیمت‌ها بر اساس SLA، ساعات پوشش،
                و سطح تخصص تیم تعیین می‌شود.
              </p>
              <div className="mt-6 flex justify-center md:justify-start gap-3">
                <Button className="px-6">مشاهده پلن‌ها</Button>
                <Button variant="secondary" className="px-6">
                  درخواست مشاوره
                </Button>
              </div>
            </div>

            {/* تصویر/ایلستریشن */}
            <div className="order-1 md:order-2">
              <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur rounded-3xl shadow-lg dark:shadow-black/20">
                <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-indigo-200/60 dark:bg-indigo-500/20 blur-2xl" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-200/60 dark:bg-blue-500/20 blur-2xl" />
                <Image
                  src="/assets/images/support-hero.jpg" // تصویر خودتان
                  alt="خدمات پشتیبانی و مانیتورینگ"
                  width={920}
                  height={700}
                  priority
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        {plans.map((plan) => {
          const isSelected = selected === plan.name;
          return (
            <Card
              key={plan.name}
              className={`bg-white dark:bg-gray-800 flex flex-col justify-between rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl ${
                isSelected ? "ring-2 ring-blue-600 dark:ring-blue-400 scale-[1.01]" : ""
              }`}
            >
              <CardHeader className="items-center">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge className="bg-blue-600 hover:bg-blue-700">محبوب</Badge>
                  )}
                </div>
                <p className="text-lg font-bold text-blue-600">{plan.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 text-center max-w-xs">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-6">
                <ul className="space-y-2">
                  <li>⏱ ساعات پشتیبانی: {plan.hours}</li>
                  <li>⚡ زمان پاسخگویی: {plan.response}</li>
                  <li>☎️ روش ارتباط: {plan.communication}</li>
                  <li>🛠 پوشش خدمات: {plan.coverage}</li>
                  <li>📊 گزارش‌گیری: {plan.reporting}</li>
                  <li>📜 SLA: {plan.sla}</li>
                  <li>✨ خدمات اضافه: {plan.extras}</li>
                </ul>
                <Button
                  variant={isSelected ? "default" : "secondary"}
                  className="w-full mt-4"
                  onClick={() => setSelected(plan.name)}
                >
                  {isSelected ? "انتخاب شد" : "انتخاب پلن"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Plan Summary */}
      {selectedPlan && (
        <div className="max-w-6xl mx-auto mb-14">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold mb-2">
              پلن انتخابی شما: {selectedPlan.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-3">
              {selectedPlan.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4">
                <p className="font-semibold mb-2">دلایل قیمت</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>سطح SLA و زمان پاسخ‌گویی: {selectedPlan.response}</li>
                  <li>حجم پوشش: {selectedPlan.hours}</li>
                  <li>حوزه خدمات: {selectedPlan.coverage}</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4">
                <p className="font-semibold mb-2">آنچه دریافت می‌کنید</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>کانال‌های ارتباطی: {selectedPlan.communication}</li>
                  <li>گزارش‌دهی: {selectedPlan.reporting}</li>
                  <li>مزیت‌ها: {selectedPlan.extras}</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-4">
                <p className="font-semibold mb-2">گام بعدی</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>تنظیم قرارداد با SLA مورد توافق</li>
                  <li>تعریف چک‌لیست تحویل و مستندسازی اولیه</li>
                  <li>برنامه استقرار و دسترسی‌ها</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsibilities */}
      <section className="max-w-5xl mx-auto mb-14">
        <h2 className="text-2xl font-bold mb-4">📋 وظایف و تعهدات ما</h2>
        <ul className="list-disc list-inside space-y-2 leading-7">
          {responsibilities.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* FAQ - Interactive Accordion */}
      <section className="max-w-5xl mx-auto mb-14">
        <h2 className="text-2xl font-bold mb-6">❓ سؤالات متداول</h2>
        <Accordion
          type="single"
          collapsible
          className="bg-white dark:bg-gray-800 rounded-2xl shadow divide-y divide-gray-100 dark:divide-gray-700"
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="px-4">
              <AccordionTrigger className="text-right">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-7">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Glossary */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-2xl font-bold mb-4">
          📚 بخش‌های تخصصی یعنی چه؟ (واژه‌نامه کوتاه)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {glossary.map((g, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
              <p className="font-semibold">{g.term}</p>
              <p className="mt-1">{g.meaning}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
