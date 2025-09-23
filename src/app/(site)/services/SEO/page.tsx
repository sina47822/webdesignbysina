"use client";
import ScrollToTopProgress from "@/components/Scroll/Scroll";
import React, { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

/************************************
 * Next.js + TypeScript + Tailwind CSS
 * One-page SEO Pricing/Proposal layout
 * Sections with distinct color tones
 ************************************/

// Utility: simple badge
const Badge: React.FC<{ label: string }>=({ label })=> (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide shadow-sm bg-white/70 dark:bg-gray-800 backdrop-blur border-black/10 text-gray-700 dark:text-gray-400">
    {label}
  </span>
);

// Utility: section wrapper with colored background
type SectionProps = React.PropsWithChildren<{
  id: string;
  title: string;
  subtitle?: string;
  tone?:
    | "slate"
    | "indigo"
    | "gray"
    | "blue"
    | "rose"
    | "sky"
    | "zinc";
}>;

const toneMap: Record<NonNullable<SectionProps["tone"]>, string> = {
  slate:
    "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800",
  indigo:
    "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/60 dark:border-indigo-900",
  gray:
    "bg-gray-50 dark:bg-gray-950/40 border-gray-200/60 dark:border-gray-900",
  blue:
    "bg-blue-50 dark:bg-blue-950/40 border-blue-200/60 dark:border-blue-900",
  rose:
    "bg-rose-50 dark:bg-rose-950/40 border-rose-200/60 dark:border-rose-900",
  sky:
    "bg-sky-50 dark:bg-sky-950/40 border-sky-200/60 dark:border-sky-900",
  zinc:
    "bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800",
};

const Section: React.FC<SectionProps> = ({ id, title, subtitle, tone = "slate", children }) => (
  <section id={id} className={`relative border-y ${toneMap[tone]} py-16 md:py-24`}> 
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 via-transparent to-white/40 dark:from-black/20 dark:via-transparent dark:to-black/20" />
    <div className="relative mx-auto max-w-6xl px-4 md:px-6">
      <div className="mb-10 flex flex-col gap-3">
        <Badge label={`#${id}`} />
        <h2 className="text-2xl md:text-4xl py-4 font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="max-w-3xl text-sm md:text-base text-slate-600 dark:text-slate-300">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </section>
);

// Card
const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white/80 dark:bg-zinc-900/60 backdrop-blur shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

const CheckItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-2">
    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-white text-xs">✓</span>
    <span className="text-sm md:text-base text-slate-700 dark:text-slate-200">{text}</span>
  </li>
);

// Pricing Plan
type Plan = {
  name: string;
  price: string;
  highlight?: boolean;
  features: string[];
  cta?: string;
};

const plans: Plan[] = [
  {
    name: "Basic",
    price: "۱۰,۰۰۰,۰۰۰ تومان / ماه",
    features: [
      "۵ مقاله سئو شده در ماه",
      "۳ بک‌لینک باکیفیت",
      "آنالیز پایه رتبه کلمات",
      "گزارش ماهانه"
    ],
    cta: "شروع با پلن پایه",
  },
  {
    name: "Standard",
    price: "۲۰,۰۰۰,۰۰۰ تومان / ماه",
    highlight: true,
    features: [
      "۱۰ مقاله سئو شده در ماه",
      "۷ بک‌لینک باکیفیت",
      "بهینه‌سازی فنی (Technical SEO)",
      "تحلیل رقبا + گزارش تحلیلی"
    ],
    cta: "انتخاب محبوب",
  },
  {
    name: "Premium",
    price: "۳۰,۰۰۰,۰۰۰ تومان / ماه",
    features: [
      "۱۵ مقاله سئو شده در ماه",
      "۱۵ بک‌لینک باکیفیت",
      "مانیتورینگ 24/7 + جلسات مشاوره",
      "استراتژی اختصاصی"
    ],
    cta: "حداکثر رشد",
  },
];

const AnchorNav: React.FC = () => (
  <nav className="sticky top-3 z-20 mx-auto mb-6 max-w-6xl px-4 md:px-6">
    <ul className="flex flex-wrap items-center gap-2 md:gap-3">
      {[
        { id: "whyseo", label: "چرا سئو مهمه؟"},
        { id: "overview", label: "مرور" },
        { id: "scope", label: "محدوده خدمات" },
        { id: "pricing", label: "پلن‌ها" },
        { id: "process", label: "فرآیند" },
        { id: "faq", label: "سوالات متداول" },
        { id: "painpoints", label: "چالش های انتخاب سئو کار"},
        { id: "contact", label: "تماس" },
      ].map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            className="inline-flex rounded-full border px-3 py-1 text-xs md:text-sm text-slate-700 dark:text-slate-200 bg-white/60 dark:bg-zinc-900/60 hover:bg-white shadow-sm"
          >
            {i.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const Hero: React.FC = () => (
  <header className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-gray-50 to-rose-100 dark:from-zinc-900 dark:via-slate-900 dark:to-black" />
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4"><Badge label="SEO Proposal" /></div>
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            ساختار شفاف قیمت‌گذاری و ارائه خدمات سئو
          </h1>
          <p className="mt-4 max-w-xl text-slate-700 dark:text-slate-300">
            این صفحه نمونه‌ای آماده برای ارائه به مشتری است: شامل معرفی، محدوده خدمات، پلن‌های قیمت‌گذاری، فرآیند همکاری، سوالات متداول و بخش تماس.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#pricing" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold shadow hover:scale-[1.01] transition">
              مشاهده پلن‌ها
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-white/70 dark:bg-zinc-900/70 px-5 py-3 text-slate-900 dark:text-white border shadow">
              درخواست مشاوره
            </a>
          </div>
        </div>
        <Card className="p-6">
          <h3 className="text-lg font-bold">خلاصه سریع</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li>• تمرکز بر نتایج تجاری (ترافیک ارگانیک، لید، فروش)</li>
            <li>• گزارش‌دهی شفاف ماهانه و KPI های قابل اندازه‌گیری</li>
            <li>• انعطاف در قرارداد (ماهانه/پروژه‌ای/ترکیبی)</li>
          </ul>
        </Card>
      </div>
    </div>
  </header>
);

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {
    if (window.scrollY > 300) setVisible(true);
    else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


    return (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 start-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:scale-105 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <FaArrowUp />
      </button>
    );
  };

const SeoPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
      <Hero />

      <AnchorNav />

      <Section
        id="whyseo"
        tone="rose"
        title="چرا سئو مهم است؟"
        subtitle="تعریف، اهمیت و ارزش واقعی سئو برای کسب‌وکارها"
      >
        <div className="mx-auto max-w-5xl grid gap-4 md:gap-6">
          {[
            { h: "سئو چیست؟", p: "سئو یا بهینه‌سازی موتور جستجو مجموعه‌ای از اقدامات فنی و محتوایی است که باعث می‌شود سایت شما در نتایج گوگل بهتر دیده شود." },
            { h: "افزایش دیده‌شدن برند", p: "بیش از ۹۰٪ کاربران از گوگل برای یافتن محصولات و خدمات استفاده می‌کنند؛ سئو شما را جلوی چشم آن‌ها قرار می‌دهد." },
            { h: "جذب مشتریان هدفمند", p: "کاربرانی که از طریق جستجو وارد سایت می‌شوند به‌دنبال همان چیزی هستند که شما ارائه می‌دهید." },
            { h: "کاهش هزینه‌های بازاریابی", p: "در مقایسه با تبلیغات پولی، سئو سرمایه‌گذاری بلندمدت و پایدار است که هزینه جذب مشتری را کاهش می‌دهد." },
            { h: "ایجاد اعتبار و اعتماد", p: "سایت‌هایی که رتبه‌های بالا دارند در ذهن مخاطب معتبرتر و قابل اعتمادتر تلقی می‌شوند." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border bg-white/80 dark:bg-zinc-900/60 backdrop-blur p-5 md:p-6">
              <h4 className="font-bold text-lg md:text-xl leading-8">{item.h}</h4>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-7">{item.p}</p>
            </div>
          ))}
        </div>
      </Section>
      
      <Section
        id="overview"
        tone="zinc"
        title="اهداف همکاری"
        subtitle="اهداف را روشن، فاصله‌ها را قابل سنجش و مسیر را شفاف می‌کنیم"      >
        <div className="grid gap-4 md:gap-6">
          {[
            { h: "افزایش ترافیک ارگانیک باکیفیت", p: "رشد %X در ۶ ماه روی خوشه‌های کلیدی (نرخ پرش پایین‌تر، زمان ماندگاری بالاتر)." },
            { h: "بهبود رتبه کلمات پول‌ساز", p: "رساندن کلمات اولویت‌دار به صفحه ۱/Top 3 با تمرکز بر Intent و CTR." },
            { h: "افزایش نرخ تبدیل ارگانیک", p: "بهبود فرم‌ها/لندینگ‌ها، هماهنگی پیام محتوا با نیت کاربر و تست‌های دوره‌ای." },
            { h: "تقویت E-E-A-T و برند", p: "اعتبار نویسنده/شرکت، استنادها، پروفایل رسانه‌ای و سیگنال‌های اعتماد." },
            { h: "پایداری فنی و سرعت", p: "بهبود CWV، ثبات ایندکس و ساختار سایت برای مقیاس‌پذیری." },
          ].map((item) => (
            <Card key={item.h} className="p-6">
              <h4 className="font-bold">{item.h}</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.p}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="scope"
        tone="sky"
        title="محدوده خدمات (Scope of Work)"
        subtitle="تفکیک کامل: فنی، آن‌پیج، محتوا، آف‌پیج و تحلیل"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h4 className="font-semibold">Technical SEO (جداگانه و عمیق)</h4>
            <ul className="mt-4 space-y-2">
              {[
                "Crawl budget و بهینه‌سازی لاگ‌های سرور",
                "ایندکسینگ، نقشه سایت، Robots و مدیریت پارامترها",
                "Core Web Vitals، تصویرسازی بهینه، Lazy/Preload/Preconnect",
                "معماری اطلاعات، ریدایرکت‌ها، canonical و hreflang",
                "اسکیما مارک‌آپ (FAQ, Article, Product, HowTo, Breadcrumb)",
              ].map((t) => (
                <CheckItem key={t} text={t} />
              ))}
            </ul>
          </Card>


          <Card className="p-6">
            <h4 className="font-semibold">On-page SEO</h4>
            <ul className="mt-4 space-y-2">
              {[
                "بهینه‌سازی تایتل، متا، هدینگ و لینک‌سازی داخلی",
                "Templateهای صفحه برای لندینگ‌های پول‌ساز",
                "E-E-A-T: نویسنده، منابع، پروفایل شرکت",
                "A/B تست عناصر SERP (تایتل/متا) و CTR curve",
              ].map((t) => (
                <CheckItem key={t} text={t} />
              ))}
            </ul>
          </Card>


          <Card className="p-6">
            <h4 className="font-semibold">Content Strategy & Production</h4>
            <ul className="mt-4 space-y-2">
              {[
                "تحقیق خوشه‌ای و Intent mapping",
                "تقویم محتوا، بریف نویسندگی و دستورالعمل سبک",
                "به‌روزرسانی محتواهای کهنه (Content Refresh)",
                "صفحات Topic Authority و راهنمای جامع",
              ].map((t) => (
                <CheckItem key={t} text={t} />
              ))}
            </ul>
          </Card>


          <Card className="p-6">
            <h4 className="font-semibold">Off-page & Digital PR</h4>
            <ul className="mt-4 space-y-2">
              {[
                "لینک‌سازی ایمن، مدیریت انکرتکست و تنوع دامنه",
                "Outreach هدفمند و رپورتاژ باکیفیت",
                "Brand mention و Citation برای Local SEO",
                "افزایش E-E-A-T با حضور رسانه‌ای و رفرنس‌ها",
              ].map((t) => (
                <CheckItem key={t} text={t} />
              ))}
            </ul>
          </Card>


          <Card className="p-6 md:col-span-2">
            <h4 className="font-semibold">Measurement & Analytics</h4>
            <ul className="mt-4 space-y-2">
              {[
                "راه‌اندازی GA4, GSC و داشبورد KPI",
                "Defining North Star Metric و قیف تبدیل",
                "Attribution ساده و گزارش‌دهی اجرایی",
              ].map((t) => (
                <CheckItem key={t} text={t} />
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        id="pricing"
        tone="indigo"
        title="پلن‌ها و قیمت‌گذاری"
        subtitle="جزییات هر پلن به تفکیک چیزی که تحویل میگیرید و سطح پشتیبانی"
      >
        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`p-6 ${p.highlight ? "ring-2 ring-indigo-500" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  {p.highlight && <Badge label="محبوب" />}
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">برای وب‌سایت‌های {p.name === "Basic" ? "در حال شروع" : p.name === "Standard" ? "رشد یافته" : "در حال مقیاس‌پذیری"}</p>
                <div className="mt-4 text-2xl font-extrabold">{p.price}</div>

                <div className="mt-4 grid gap-4">
                  <div>
                    <h4 className="text-sm font-semibold">تحویل‌دادنی‌ها</h4>
                    <ul className="mt-2 space-y-2">
                      {p.features.map((f) => (
                      <CheckItem key={f} text={f} />
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">پشتیبانی و گزارش</h4>
                    <ul className="mt-2 space-y-2">
                      <CheckItem text={p.name === 'Basic' ? 'گزارش ماهانه استاندارد' : p.name === 'Standard' ? 'گزارش ماهانه تحلیلی + جلسه ۳۰ دقیقه‌ای' : 'گزارش هفتگی + جلسه ماهانه ۶۰ دقیقه‌ای'} />
                      <CheckItem text={p.name === 'Premium' ? 'SLA پاسخ‌گویی ۴۸ ساعته' : 'SLA پاسخ‌گویی ۷۲ ساعته'} />
                      <CheckItem text={p.name !== 'Basic' ? 'داشبورد KPI سفارشی' : 'Dashboard پایه GA4/Search Console'} />
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">موارد خارج از شمول</h4>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">هزینه‌های رسانه‌های پولی، توسعه سنگین بک‌اند/فرانت، خرید رپورتاژهای پرهزینه، تولید محتوای ویدیویی تخصصی.</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="text-md font-semibold">گزینه‌های افزایشی (Add-ons)</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• تحقیقات عمیق خوشه‌ای و Intent map پیشرفته</li>
                  <li>• تولید محتوای تخصصی توسط SME</li>
                  <li>• Digital PR و کمپین‌های خبری</li>
                  <li>• راه‌اندازی CDP/سرور ساید تگینگ</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold">شرایط پرداخت</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• پیش‌پرداخت ابتدای هر ماه</li>
                  <li>• تخفیف قرارداد ۶ یا ۱۲ ماهه</li>
                  <li>• امکان مدل ترکیبی ثابت + پاداش نتیجه</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold">ملاک‌های قیمت‌گذاری</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• رقابت بازار و دشواری کلمات</li>
                  <li>• وضعیت فنی/محتوایی فعلی سایت</li>
                  <li>• سرعت مورد انتظار دستیابی به KPI</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="process"
        tone="gray"
        title="نقشه راه ۸ مرحله‌ای"
        subtitle="مسیرهای به‌هم‌پیوسته از شروع تا دستیابی به نتایج"
      >
        <ol className="relative mx-auto max-w-4xl border-s-l-2 border-gray-300/60 dark:border-gray-800/60 ps-6 space-y-6">          {[
            { t: "کشف و هم‌راستاسازی", d: "شناخت بیزنس، پرسونای مخاطب، KPI و تعریف موفقیت." },
            { t: "ممیزی فنی (Audit)", d: "خزش کامل، تشخیص مشکلات ایندکس، CWV، لاگ‌آنالیز اولیه." },
            { t: "استراتژی کلمات کلیدی", d: "خوشه‌بندی، Intent mapping، تعیین اولویت صفحات هدف." },
            { t: "بهینه‌سازی فنی", d: "رفع خطاهای حیاتی، اسکیما، معماری اطلاعات، ریدایرکت‌ها." },
            { t: "استراتژی محتوا", d: "تقویم تولید/به‌روزرسانی، الگوهای محتوایی و برگه‌های پول‌ساز." },
            { t: "Off-page و لینک‌سازی", d: "برنامه رفرنس‌سازی ایمن، دیجیتال PR و مدیریت انکرتکست." },
            { t: "اندازه‌گیری و آزمون", d: "Dashboard، تست‌های A/B روی تایتل/متا/لندینگ و بهبود مستمر." },
            { t: "مقیاس‌پذیری و تکرار", d: "اتوماسیون، مستندسازی و بازارهای جدید." },
          ].map((s, i) => (
          <li key={i} className="relative">
            <span className="absolute -start-[22px] top-2 inline-flex h-3 w-3 rounded-full bg-gray-500 ring-4 ring-gray-200/60 dark:ring-gray-900/40" />
            <div className="ps-2">
            <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">مرحله {i + 1}</div>
              <h5 className="mt-1 text-lg font-bold leading-7">{s.t}</h5>
              <p className="mt-1 text-sm leading-7 text-slate-700 dark:text-slate-300">{s.d}</p>
            </div>
          </li>
          ))}
        </ol>
      </Section>
      
      <Section
        id="painpoints"
        tone="slate"
        title="چالش‌های انتخاب سئوکار"
        subtitle="مشتریان هنگام انتخاب متخصص سئو معمولاً با این مشکلات روبه‌رو هستند"
      >
        <div className="mx-auto max-w-5xl grid gap-4 md:gap-6">
          {[
            { h: "عدم شفافیت در روش کار", p: "بسیاری از ارائه‌دهندگان بدون توضیح روشن در مورد فرآیند و شاخص‌های موفقیت کار را شروع می‌کنند." },
            { h: "وعده‌های غیرواقعی", p: "قول رتبه یک گوگل در مدت کوتاه یا تضمین ۱۰۰٪ نشانه عدم حرفه‌ای بودن است." },
            { h: "قیمت‌گذاری مبهم", p: "نداشتن ساختار قیمت مشخص یا هزینه‌های پنهان باعث بی‌اعتمادی می‌شود." },
            { h: "عدم گزارش‌دهی منظم", p: "بدون گزارش شفاف، مشتری نمی‌داند چه کاری انجام شده و چه نتیجه‌ای گرفته است." },
            { h: "تکنیک‌های منسوخ یا کلاه‌سیاه", p: "استفاده از روش‌های اسپم می‌تواند منجر به جریمه گوگل شود." },
            { h: "فقدان دانش تجاری", p: "تمرکز صرف روی ترافیک بدون توجه به تبدیل و اهداف بیزنس ارزش‌آفرین نیست." },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border bg-white/80 dark:bg-zinc-900/60 backdrop-blur p-5 md:p-6">
              <h4 className="font-bold text-lg md:text-xl leading-8">{item.h}</h4>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-7">{item.p}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section
        id="faq"
        tone="rose"
        title="سوالات متداول"
        subtitle="پرسش‌های عمومی و پاسخ‌های کوتاه"
      >
        <div className="mx-auto max-w-4xl">
          <ul className="divide-y divide-blue-200/70 dark:divide-blue-900/40 bg-rose-50/40 dark:bg-rose-950/10 rounded-2xl">
            {[
              { q: "نتایج سئو از چه زمانی قابل مشاهده است؟", a: "معمولاً ۳ تا ۶ ماه بسته به رقابت و وضعیت فعلی سایت." },
              { q: "سئو تضمینی است؟", a: "هیچ‌کس نمی‌تواند رتبه مشخصی را تضمین کند؛ ما روی فرآیند اصولی و KPIهای شفاف تمرکز می‌کنیم." },
              { q: "بودجه لینک‌سازی چطور محاسبه می‌شود؟", a: "بر اساس کیفیت دامنه‌ها، نوع ریفرنس و تعداد لینک‌ها؛ معمولاً به‌صورت جداگانه آیتم‌بندی می‌شود." },
              { q: "چند مقاله در ماه نیاز داریم؟", a: "به حجم کلمات کلیدی و فاصله با رقبا بستگی دارد؛ ۴ تا ۱۵ مقاله در ماه رایج است." },
              { q: "اگر سایت ایراد فنی داشته باشد چه می‌کنید؟", a: "در فاز تکنیکال، مشکلات Core Web Vitals، ایندکسینگ و اسکیما را مشخص و رفع می‌کنیم." },
              { q: "گزارش‌دهی چگونه است؟", a: "گزارش ماهانه شامل رشد ترافیک، رتبه کلمات، کارهای انجام‌شده و برنامه ماه بعد ارائه می‌شود." },
              { q: "قرارداد حداقل چند ماه است؟", a: "برای اثرگذاری پایدار حداقل ۳ ماه پیشنهاد می‌شود." },
              { q: "سئوی محلی (Local SEO) هم انجام می‌دهید؟", a: "بله، راه‌اندازی/بهینه‌سازی Google Business Profile، NAP و رفرنس‌های محلی انجام می‌شود." },
              { q: "هزینه ابزارها با شماست یا کارفرما؟", a: "بسته به پلن؛ در پلن‌های پیشرفته بخشی از هزینه لایسنس ابزارها داخل قرارداد محاسبه می‌شود." },
              { q: "آیا می‌توان مدل ترکیبی ماهانه + پاداش نتیجه داشت؟", a: "بله، می‌توان بخشی ثابت و پاداش مبتنی بر اهداف (مثلاً رشد لید) تعریف کرد." },
            ].map((f, idx) => (
              <li key={idx} className="p-4 md:p-5">
                <details className="group">
                  <summary className="cursor-pointer list-none font-semibold flex items-start justify-between gap-4">
                    <span className="leading-7">{f.q}</span>
                    <span className="transition group-open:rotate-180 inline-flex h-6 w-6 items-center justify-center rounded-full border">
                      <FaArrowDown />
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-7">{f.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        id="contact"
        tone="rose"
        title="در تماس باشیم"
        subtitle="برای دریافت پروپوزال اختصاصی و برآورد دقیق‌تر کلیک کنید"
      >
        <Card className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("فرم نمونه است؛ اینجا می‌توانید هندلر دلخواه خود را متصل کنید.");
            }}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="grid gap-2">
              <label className="text-sm">نام و نام خانوادگی</label>
              <input className="rounded-xl border bg-white/80 px-3 py-2 text-slate-900 dark:text-white dark:bg-zinc-800" placeholder="مثلاً: سینا افشار" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">ایمیل</label>
              <input type="email" className="rounded-xl border bg-white/80 px-3 py-2 text-slate-900 dark:text-white dark:bg-zinc-800" placeholder="you@example.com" />
            </div>
            <div className="md:col-span-2 grid gap-2">
              <label className="text-sm">توضیحات پروژه</label>
              <textarea className="min-h-[120px] rounded-xl border bg-white/80 px-3 py-2 text-slate-900 dark:text-white dark:bg-zinc-800" placeholder="کلمات کلیدی هدف، وضعیت فعلی سایت، رقبا و…" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">ارسال این فرم به معنی تایید قوانین و سیاست حریم خصوصی است.</p>
              <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white shadow hover:scale-[1.01] transition">
                دریافت مشاوره رایگان
              </button>
            </div>
          </form>
        </Card>
      </Section>
      <ScrollToTopProgress />
    </main>
  );
};

export default SeoPage;
