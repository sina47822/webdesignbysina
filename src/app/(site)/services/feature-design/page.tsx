// components/PricingGuide.tsx
"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ChevronDown, ChevronUp } from "lucide-react";
import FeatureHero from "./featureHero";
import HeroShadcn from "./HeroShadcn";
import PricingSection from "./pricint";
import SamplesSection from "./sampleSection";

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "کامپوننت (Component) چیست؟",
    answer:
      "کامپوننت در React/Next.js یک بخش مجزا از رابط کاربری است (مثل دکمه یا کارت). این باعث می‌شود پروژه ساختاریافته‌تر و قابل‌استفاده مجدد باشد.",
  },
  {
    question: "ریسپانسیو (Responsive) یعنی چه؟",
    answer:
      "یعنی طراحی طوری انجام شود که در موبایل، تبلت و دسکتاپ به درستی نمایش داده شود.",
  },
  {
    question: "Tailwind CSS چیست؟",
    answer:
      "یک فریمورک CSS Utility-first است که طراحی سریع و قابل‌سفارشی‌سازی رابط کاربری را ممکن می‌کند.",
  },
  {
    question: "Shadcn UI چیست؟",
    answer:
      "کتابخانه‌ای از کامپوننت‌های از پیش ساخته شده برای React/Next.js که با Tailwind سازگار است.",
  },
  {
    question: "TypeScript چه کمکی می‌کند؟",
    answer:
      "TypeScript نسخه تایپ‌دار جاوااسکریپت است که خطاهای احتمالی را قبل از اجرا پیدا می‌کند و پروژه پایدارتر می‌شود.",
  },
];

export default function PricingGuide() {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>

        <FeatureHero gifUrl="/assets/component.mp4" />

      <div
        className="dark:bg-gray-950 dark:text-gray-100 min-h-screen bg-white text-gray-900 min-h-screen"
      >
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Section 1: Pricing Models */}
          <section>
            <h2 className="text-2xl font-bold mb-4">روش‌های رایج قیمت‌گذاری</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><b>بر اساس تعداد کامپوننت:</b> قیمت ثابت برای هر کامپوننت.</li>
              <li><b>ساعتی (Hourly):</b> محاسبه بر اساس زمان کار (مثلاً ۲۰۰هزار تومان در ساعت).</li>
              <li><b>پروژه‌ای (Fixed):</b> قیمت کل پروژه از ابتدا مشخص می‌شود.</li>
              <li><b>قرارداد پشتیبانی:</b> پرداخت ماهیانه برای نگهداری و توسعه.</li>
            </ul>
          </section>
          {/* Section 2: Factors */}
          <section>
            <h2 className="text-2xl font-bold mb-4">عوامل کلیدی در تعیین هزینه</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>پیچیدگی طراحی و میزان سفارشی‌سازی</li>
              <li>ریسپانسیو بودن برای موبایل/تبلت/دسکتاپ</li>
              <li>استفاده از کتابخانه‌هایی مثل Tailwind یا Shadcn</li>
              <li>زمان تحویل و میزان فوری بودن پروژه</li>
              <li>پشتیبانی پس از تحویل</li>
            </ul>
          </section>

          {/* Section 3: Professional Suggestion */}
          <section>
            <h2 className="text-2xl font-bold mb-4">پیشنهاد مدل حرفه‌ای</h2>
            <p>
              برای شفافیت بیشتر، بهتر است هزینه پروژه را به صورت <b>پروژه‌ای ثابت</b> اعلام کنید
              و تغییرات اضافه را به شکل <b>ساعتی یا کامپوننتی</b> محاسبه نمایید.
            </p>
          </section>

          {/* Section 4: Pricing Table */}
          <section>
            <h2 className="text-2xl font-bold mb-4">نمونه جدول قیمت‌گذاری پیشنهادی</h2>
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border p-2">نوع کامپوننت</th>
                  <th className="border p-2">سطح پیچیدگی</th>
                  <th className="border p-2">هزینه تخمینی</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border p-2">Button ساده</td>
                  <td className="border p-2">کم</td>
                  <td className="border p-2">۵۰۰ هزار تومان</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border p-2">Modal با فرم</td>
                  <td className="border p-2">متوسط</td>
                  <td className="border p-2">۱.۵ میلیون تومان</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="border p-2">Dashboard داینامیک</td>
                  <td className="border p-2">زیاد</td>
                  <td className="border p-2">۵ تا ۷ میلیون تومان</td>
                </tr>
              </tbody>
            </table>
          </section>
          <SamplesSection />
          <PricingSection />
          {/* Section 5: FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-4">سوالات متداول</h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-700"
                >
                  <CardContent>
                    <button
                      className="w-full flex justify-between items-center py-2"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                    >
                      <span className="font-medium">{faq.question}</span>
                      {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {openIndex === index && (
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
