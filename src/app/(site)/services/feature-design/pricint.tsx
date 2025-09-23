// --- Pricing Section ---
export default function PricingSection() {
  const tiers = [
    {
      name: "استارتر",
      price: "۳,۹۰۰,۰۰۰",
      period: "برای هر مینی‌ماژول",
      features: [
        "۳–۵ کامپوننت پایه (Button, Input, Modal)",
        "ریسپانسیو کامل",
        "تم روشن/تیره Tailwind",
        "تحویل ۳–۵ روز کاری",
      ],
      cta: { label: "شروع سریع", href: "#contact" },
      highlight: false,
    },
    {
      name: "حرفه‌ای",
      price: "۹,۵۰۰,۰۰۰",
      period: "پکیج کامپوننت",
      features: [
        "۱۰–۱۵ کامپوننت سفارشی",
        "Shadcn + Radix UI + الگوهای تعاملی",
        "Docs کوتاه + استوری‌بوک پایه",
        "تحویل ۷–۱۰ روز کاری",
        "۱ ماه پشتیبانی جزئی",
      ],
      cta: { label: "درخواست پروپوزال", href: "#contact" },
      highlight: true,
    },
    {
      name: "نگهداری",
      price: "۴,۵۰۰,۰۰۰",
      period: "ماهیانه (رتینر)",
      features: [
        "رفع باگ و به‌روزرسانی سبک",
        "بهینه‌سازی عملکرد/دسترس‌پذیری",
        "افزودن ۲–۳ فیچر کوچک",
        "مشاوره فنی دوره‌ای",
      ],
      cta: { label: "رزرو رتینر", href: "#contact" },
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-12">
      <h2 className="text-2xl font-bold mb-2">مشاهده قیمت‌ها</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        قیمت‌ها بسته به پیچیدگی و سفارشی‌سازی نهایی تغییر می‌کنند. این جدول برای برآورد اولیه است.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={[
              "rounded-2xl border p-6 transition",
              "border-gray-200 dark:border-gray-800",
              t.highlight
                ? "ring-1 ring-gray-300 dark:ring-gray-700 bg-gray-50 dark:bg-gray-900"
                : "bg-white dark:bg-gray-950",
            ].join(" ")}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              {t.highlight && (
                <span className="text-xs px-2 py-1 rounded-full border border-gray-300 dark:border-gray-700">
                  محبوب
                </span>
              )}
            </div>

            <div className="mt-4">
              <span className="text-3xl font-extrabold">{t.price}</span>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">تومان</span>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.period}</div>
            </div>

            <ul className="mt-5 space-y-2 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span>✅</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={t.cta.href}
              className={[
                "mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-semibold",
                t.highlight
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:opacity-90"
                  : "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900",
              ].join(" ")}
            >
              {t.cta.label}
            </a>

            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              تغییرات خارج از محدوده با تعرفه ساعتی محاسبه می‌شود.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}