export default function SamplesSection() {
  const samples = [
    {
      title: "داشبورد فروش",
      desc: "چارت‌های داینامیک، فیلترها و جدول‌های قابل‌مرتب‌سازی.",
      tags: ["Next.js", "Tailwind", "TypeScript"],
      href: "#",
    },
    {
      title: "سیستم دیزاین کامپوننتی",
      desc: "دکمه‌ها، فرم‌ها، مودال‌ها و الگوهای تعاملی با داستان‌نویسی.",
      tags: ["Shadcn", "Radix UI", "Storybook"],
      href: "#",
    },
    {
      title: "وب‌اپ مارکتینگ",
      desc: "صفحات فرود، هیرو انیمیشن، SEO و فرم‌های جمع‌آوری لید.",
      tags: ["SEO", "Animations", "Forms"],
      href: "#",
    },
  ];

  return (
    <section id="samples" className="py-12">
      <h2 className="text-2xl font-bold mb-2">نمونه‌کارها</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        چند نمونه‌ی واقعی برای نمایش کیفیت پیاده‌سازی و الگوهای طراحی.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {samples.map((s, i) => (
          <a
            key={i}
            href={s.href}
            className="block rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition"
          >
            <div className="aspect-[16/10] w-full rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mb-4" />
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-full border px-2.5 py-1 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}