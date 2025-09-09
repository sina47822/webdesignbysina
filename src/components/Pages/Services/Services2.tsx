'use client';

import { motion, useInView } from 'framer-motion';
import { JSX, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import CardFlip2 from '@/components/Cards/FlipCard2';
import { cn } from '@/lib/utils';

// آیکون‌های نقشه
import {
  Rocket,
  Zap,
  LineChart,
  LifeBuoy,
  DownloadCloud,
  LayoutTemplate,
  Globe,
} from 'lucide-react';

// ✅ JSON را ایمپورت کن
const servicesData = [
  {
    "icon": "rocket",
    "title": "طراحی سایت",
    "link": "/pricing",
    "description": "طراحی وب‌سایت‌های سریع، ریسپانسیو و مقیاس‌پذیر با تمرکز بر UI/UX، سئو و امنیت."
  },
  {
    "icon": "zap",
    "title": "طراحی اختصاصی المان",
    "link": "/services/feature-design",
    "description": "طراحی و توسعه کامپوننت‌های اختصاصی و میکرواینترکشن‌های روان مطابق هویت برند شما."
  },
  {
    "icon": "lineChart",
    "title": "سئو",
    "link": "/services/SEO",
    "description": "تحقیق کلمات کلیدی، بهینه‌سازی فنی (CWV/Schema) و لینک‌سازی هدفمند برای رشد ترافیک ارگانیک."
  },
  {
    "icon": "lifeBuoy",
    "title": "پشتیبانی وبسایت",
    "link": "/services/supports",
    "description": "مانیتورینگ ۲۴/۷، بکاپ‌گیری منظم، به‌روزرسانی‌ها و تقویت امنیت با گزارش‌های سالانه."
  },
  {
    "icon": "downloadCloud",
    "title": "دانلود از آپارات",
    "link": "/services/aparat-dl",
    "description": "دانلود و تبدیل ویدیوهای آپارات در کیفیت‌های مختلف و خروجی مناسب شبکه‌های اجتماعی."
  },
  {
    "icon": "layoutTemplate",
    "title": "سایت ساز",
    "link": "/webbuilder",
    "description": "راه‌اندازی سریع وب‌سایت با قالب‌های ماژولار، راست‌چین استاندارد و سئو آماده."
  },
  {
    "icon": "globe",
    "title": "چک کردن آی پی",
    "link": "/services/ip-checker",
    "description": "نمایش آی‌پی عمومی و جزئیات شبکه (ISP/کشور/وضعیت VPN/Proxy) برای عیب‌یابی."
  }
]

// یک Map برای آیکون‌ها؛ کلیدها با JSON هماهنگ هستند
const ICONS: Record<string, JSX.Element> = {
  rocket: <Rocket className="h-6 w-6 text-white" />,
  zap: <Zap className="h-6 w-6 text-white" />,
  lineChart: <LineChart className="h-6 w-6 text-white" />,
  lifeBuoy: <LifeBuoy className="h-6 w-6 text-white" />,
  downloadCloud: <DownloadCloud className="h-6 w-6 text-white" />,
  layoutTemplate: <LayoutTemplate className="h-6 w-6 text-white" />,
  globe: <Globe className="h-6 w-6 text-white" />,
};

export default function Services2() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 flex justify-center"
          >
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 rounded-full px-4 py-1 text-sm font-medium"
            >
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
            خدمات وب دیزاین با سینا
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-muted-foreground mt-4 text-xl"
          >
            ما به‌روزترین فناوری‌ها را با تمرکز بر سرعت، امنیت و تجربه کاربری ارائه می‌دهیم.
          </motion.p>
        </div>

        {/* ✅ Timeline Section */}
        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* والد را GRID کن تا کارت‌ها واقعا کنار هم بنشینند */}
          <div
            className={cn(
              'grid gap-6',
              'sm:grid-cols-2 lg:grid-cols-3' // در نمایشگرهای بزرگ ۳ ستونه
            )}
          >
            {servicesData.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, delay: 0.06 * index, ease: 'easeOut' }}
                className="flex" // کمک می‌کند کارت فرزند flex-1 شود
              >
                <CardFlip2
                  className="flex-1 min-w-[260px]" // 👈 اجازه‌ی کش‌آمدن در grid/flex
                  title={item.title}
                  description={item.description}
                  icon={ICONS[item.icon] ?? ICONS.rocket}
                  link={item.link}
                  ctaText="برو"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
