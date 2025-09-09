'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { NumberTicker } from '@/components/ui/counter';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// lucide-react icons
import {
  Users,
  Award,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  LineChart,
  LifeBuoy,
  DownloadCloud,
  LayoutTemplate,
  Globe,
} from 'lucide-react';

interface StatItemProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  delay?: number;
  decimalPlaces?: number;
  color?: string;
}

const StatItem = ({
  value,
  label,
  icon,
  delay = 0,
  decimalPlaces = 0,
  color = 'from-primary to-primary/70',
}: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay, ease: 'easeOut' }}
      className={cn(
        'group border-border/30 bg-card relative overflow-hidden rounded-xl border p-6',
        resolvedTheme === 'dark' ? 'shadow-xl shadow-black/5' : 'shadow-lg shadow-black/[0.03]'
      )}
    >
      <div
        className={cn(
          'absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30 group-hover:blur-3xl',
          color
        )}
      />

      <div className="flex items-center gap-4">
        <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white', color)}>
          {icon}
        </div>

        <div className="flex flex-col">
          <h3 className="flex items-baseline text-3xl font-bold tracking-tight">
            <NumberTicker value={value} decimalPlaces={decimalPlaces} className="tabular-nums" />
            <span className="ml-1 text-sm font-medium opacity-70">+</span>
          </h3>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Services1() {
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  const stats = [
    {
      value: 15,
      label: 'مشتری خوشحال',
      icon: <Users className="h-5 w-5" />,
      delay: 0,
      color: 'from-rose-500 to-orange-500',
      decimalPlaces: 0,
    },
    {
      value: 8,
      label: 'سال سابقه فعالیت',
      icon: <Clock className="h-5 w-5" />,
      delay: 0.1,
      color: 'from-blue-500 to-cyan-500',
      decimalPlaces: 0,
    },
    {
      value: 20,
      label: 'پروژه تکمیل شده',
      icon: <CheckCircle className="h-5 w-5" />,
      delay: 0.2,
      color: 'from-green-500 to-emerald-500',
      decimalPlaces: 0,
    },
    {
      value: 8,
      label: 'زبان برنامه‌نویسی',
      icon: <Award className="h-5 w-5" />,
      delay: 0.3,
      color: 'from-purple-500 to-violet-500',
      decimalPlaces: 0,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.05]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        {/* Header Section with Badge */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 flex justify-center"
          >
            <Badge variant="outline" className="border-primary/20 bg-primary/5 rounded-full px-4 py-1 text-sm font-medium">
              <Sparkles className="text-primary mr-1 h-3.5 w-3.5" />
              خدمات ما
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="from-foreground to-foreground/70 bg-gradient-to-b bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            خدمات وب‌دیزاین با سینا
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-muted-foreground mt-4 text-xl"
          >
            ما به‌روزترین فناوری‌های دنیا را با تمرکز بر سرعت، امنیت و تجربه کاربری به شما ارائه می‌دهیم.
          </motion.p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mb-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                delay={stat.delay || index * 0.1}
                decimalPlaces={stat.decimalPlaces}
                color={stat.color}
              />
            ))}
          </div>
        </div>

        {/* About Content Section */}
        <div ref={aboutRef} className="relative mx-auto mb-20">
          <div className="grid gap-16 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="relative space-y-6"
            >
              <Link href={'/services/feature-design'}>
                <div className="from-primary/80 to-primary/60 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg mb-6">
                  <Zap className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight">طراحی اختصاصی المان</h2>

                <p className="text-muted-foreground text-base leading-relaxed">
                  ما در «طراحی اختصاصی المان» هر جزء رابط کاربری را دقیقاً بر اساس برند، مخاطب و هدف‌های تجاری شما می‌سازیم. به‌جای استفاده از الگوهای تکراری، از سیستم‌های طراحی ماژولار، گریدهای انعطاف‌پذیر و میکرواینترکشن‌های حساب‌شده بهره می‌بریم تا المان‌ها علاوه بر زیبایی، کارکرد واقعی داشته باشند. از دکمه و کارت محصول تا کامپوننت‌های پیچیده مثل فیلترهای چندوجهی و جدول‌های تعاملی، همه‌چیز با رویکرد طراحی واکنش‌گرا، دسترس‌پذیر (WCAG) و بهینه برای عملکرد پیاده‌سازی می‌شود. ما با استفاده از Tailwind، Framer Motion و کتابخانه‌های مدرن، انیمیشن‌های روان و بدون لگ ارائه می‌دهیم و در عین حال با بهینه‌سازی لایه‌های DOM و کاهش بار جاوااسکریپت، زمان بارگذاری را پایین نگه می‌داریم. خروجی نهایی، مجموعه‌ای از المان‌های اختصاصی و مقیاس‌پذیر است که در یک Design System مستند شده و به‌سادگی در صفحات مختلف تکرارپذیر است؛ بنابراین تیم شما می‌تواند سریع‌تر توسعه دهد، ثبات بصری حفظ شود و تجربه کاربری در همه دستگاه‌ها یکدست و حرفه‌ای بماند.
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="relative space-y-6"
            >
              <Link href={'/webbuilder'}>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/80 to-blue-500/60 text-white shadow-lg mb-6">
                  <LineChart className="h-6 w-6" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight">سایت‌ساز</h2>

                <p className="text-muted-foreground text-base leading-relaxed">
                  «سایت‌ساز» ابزاری است که به شما امکان می‌دهد بدون درگیر شدن با پیچیدگی‌های فنی، در کوتاه‌ترین زمان یک وب‌سایت سریع، امن و قابل توسعه داشته باشید. ما قالب‌های حرفه‌ای را بر اساس صنایع مختلف (فروشگاهی، خدماتی، شخصی و محتوایی) آماده کرده‌ایم که همگی با Tailwind و Next.js توسعه یافته‌اند و از لحاظ سئو و عملکرد بهینه‌اند. هر قالب به‌صورت ماژولار طراحی شده تا بتوانید بخش‌ها را به‌دلخواه جابه‌جا یا شخصی‌سازی کنید؛ از هدر و فوتر تا بلاک‌های قهرمان، اسلایدرها، جداول قیمت‌گذاری و بخش‌های وبلاگ. ادغام با سرویس‌های تحلیلی، درگاه‌های پرداخت، فرم‌سازها و ابزارهای ایمیل مارکتینگ به‌صورت پیش‌فرض در نظر گرفته شده است. همچنین پنل مدیریت ساده و محلی‌سازی کامل (RTL/LTR) باعث می‌شود محتوای فارسی و انگلیسی را به‌راحتی منتشر کنید. نتیجه نهایی: وب‌سایتی که زیبا به نظر می‌رسد، در موتورهای جست‌وجو درست دیده می‌شود و با رشد کسب‌وکار شما هم‌گام می‌ماند.
                </p>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="relative mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-10 text-center text-2xl font-bold tracking-tight md:text-3xl"
          >
            سایر خدمات ما
          </motion.h2>

          <div className="border-border/60 relative ml-4 border-l pl-8 md:ml-0 md:border-none md:pl-0">
            {[
              {
                icon: <LineChart className="h-5 w-5" />,
                title: 'سئو',
                link: '/services/SEO',
                description:
                  'بهینه‌سازی فنی، محتوایی و لینک‌سازی بر اساس تحلیل کلمات کلیدی و رفتار کاربر. ما ساختار اطلاعات، سرعت، اسکیما و Core Web Vitals را بهبود می‌دهیم تا رتبه و ترافیک ارگانیک شما رشد کند.',
              },
              {
                icon: <LifeBuoy className="h-5 w-5" />,
                title: 'پشتیبانی وب‌سایت',
                link: '/services/supports',
                description:
                  'مانیتورینگ ۲۴/۷، به‌روزرسانی افزونه‌ها و هسته، پشتیبان‌گیری منظم، رفع باگ و بهبود امنیت. SLA شفاف و گزارش‌های سالانه برای آرامش خاطر شما.',
              },
              {
                icon: <DownloadCloud className="h-5 w-5" />,
                title: 'دانلود از آپارات',
                link: '/services/aparat-dl',
                description:
                  'استخراج ویدیوهای آپارات با کیفیت‌های مختلف به‌همراه تبدیل فرمت و فشرده‌سازی بهینه برای استفاده در شبکه‌های اجتماعی یا آرشیو شخصی.',
              },
              {
                icon: <LayoutTemplate className="h-5 w-5" />,
                title: 'سایت‌ساز',
                link: '/webbuilder',
                description:
                  'راه‌اندازی سریع وب‌سایت با قالب‌های ماژولار، راست‌چین استاندارد، سئو آماده و اتصال آسان به ابزارهای بازاریابی و پرداخت.',
              },
              {
                icon: <Globe className="h-5 w-5" />,
                title: 'چک کردن آی‌پی',
                link: '/services/ip-checker',
                description:
                  'نمایش آی‌پی عمومی، موقعیت تقریبی، ISP و وضعیت پروکسی/VPN برای عیب‌یابی اتصال و اعتبارسنجی دسترسی‌ها.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
              >
                <Link href={item.link} className="relative mb-10 md:grid md:grid-cols-5 md:gap-8">
                  <div className="md:col-span-1">
                    <div className="border-border bg-card absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold md:static md:h-auto md:w-auto md:rounded-none md:border-none md:bg-transparent md:text-xl">
                      {item.icon}
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-bold md:text-xl">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
