'use client';

import { useEffect, useState } from 'react';
import { easeInOut, motion, spring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Database,
  Sparkles,
  Zap,
  ArrowUpRight,
  ArrowLeft,
  ArrowUpLeft,
} from 'lucide-react';

export default function AppHero() {
  // State for animated counters
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    networks: 0,
  });

  // Animation to count up numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const newUsers = prev.users >= 20000 ? 20000 : prev.users + 500;
        const newTransactions =
          prev.transactions >= 1500000 ? 1500000 : prev.transactions + 37500;
        const newNetworks = prev.networks >= 40 ? 40 : prev.networks + 1;

        if (
          newUsers === 20000 &&
          newTransactions === 1500000 &&
          newNetworks === 40
        ) {
          clearInterval(interval);
        }

        return {
          users: newUsers,
          transactions: newTransactions,
          networks: newNetworks,
        };
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: spring, stiffness: 100 },
    },
  };

  // Floating animation for the cube
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  // Rotation animation for the orbital ring
  const rotateAnimation = {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  // Glowing effect animation
  const glowAnimation = {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  // Tooltip animation
  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: spring,
        stiffness: 100,
        delay: 1.2,
      },
    },
  };

  // Badge pulse animation
  const badgePulse = {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black py-5 text-white sm:px-6 lg:px-8 lg:py-8">
      <div className="absolute inset-0 z-0 h-full w-full rotate-180 items-center px-5 py-24 opacity-80 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <svg
        id="noice"
        className="absolute inset-0 z-10 h-full w-full opacity-30"
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.34"
            numOctaves="4"
            stitchTiles="stitch"
          ></feTurbulence>
          <feColorMatrix type="saturate" values="0"></feColorMatrix>
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.46"></feFuncR>
            <feFuncG type="linear" slope="0.46"></feFuncG>
            <feFuncB type="linear" slope="0.47"></feFuncB>
            <feFuncA type="linear" slope="0.37"></feFuncA>
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.47" intercept="-0.23" />
            <feFuncG type="linear" slope="1.47" intercept="-0.23" />
            <feFuncB type="linear" slope="1.47" intercept="-0.23" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
      </svg>
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black/70 to-gray-950 blur-3xl"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Enhanced glow spots */}
        <div className="absolute top-20 -right-20 h-60 w-60 rounded-full bg-purple-600/20 blur-[100px]"></div>
        <div className="absolute -left-20 bottom-20 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]"></div>
        <motion.div
          animate={glowAnimation}
          className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]"
        ></motion.div>
        <motion.div
          animate={glowAnimation}
          className="absolute left-1/4 bottom-1/3 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]"
        ></motion.div>
      </div>

      <div className="fadein-blur relative z-0 mx-auto mb-10 h-[300px] w-[300px] lg:absolute lg:top-130 lg:right-1/2 lg:mx-0 lg:mb-0 lg:h-[500px] lg:w-[500px] lg:translate-x-1/2 lg:-translate-y-2/3">
        <img
          src="/nexus.webp"
          alt="Nexus Platform 3D Visualization"
          className="h-full w-full object-contain drop-shadow-[0_0_35px_#3358ea85] transition-all duration-1000 hover:scale-110"
        />
        <motion.div
          variants={tooltipVariants}
          className="absolute top-4 rounded-lg border border-purple-500/30 bg-black/80 p-2 backdrop-blur-md lg:top-1/4 lg:-right-0"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-medium text-purple-200">
              بالاترین عملکرد
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={tooltipVariants}
          className="absolute top-[70%] -left-4 rounded-lg border border-blue-500/30 bg-black/80 p-2 backdrop-blur-md lg:-left-24"
        >
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-200">
              امنیت بالا
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={tooltipVariants}
          className="absolute bottom-4 right-4 rounded-lg border border-indigo-500/30 bg-black/80 p-2 backdrop-blur-md lg:bottom-1/4 lg:right-8"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-200">
              به روز و زیبا
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-10 md:pt-[700px] flex w-full max-w-[1450px] flex-grow flex-col items-center justify-center px-4 text-center sm:px-8 lg:mb-0 lg:items-end lg:justify-start lg:text-right"
      >
        <motion.div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-end">

          <div className="mt-6 flex flex-col items-center lg:mt-0 lg:items-start">
            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md pl-8 text-center text-lg leading-relaxed text-slate-300/90 lg:text-justify text-sm"
            >
              ما در تجربه های بسباری که داشته ایم همیشه سعی کرده ایم تا یادبگیریم و از تجربیات خود و دیگران در جهت بهبود خود قدم برداریم پس در نهایت ما به این نفطه رسیده ایم کهاز امکانات روز دنیا در جهت طراحی های خود استفاده کرده ایم و ایمن ترین تکنولوژی ها را با توجه به بودجه شما پیشنهاد میکنیم
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-col flex-wrap gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                className="group cursor-pointer rounded-full border-t border-purple-400 bg-gradient-to-b from-purple-700 to-slate-950/80 px-6 py-6 text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/40"
                size="lg"
              >
                شروع همکاری
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Button>

              <Button
                variant="outline"
                className="rounded-full cursor-pointer border-purple-500/30 bg-transparent text-white hover:bg-purple-500/10 hover:text-white"
                size="lg"
              >
                نمونه کارها
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mx-auto flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm lg:mx-0 lg:mr-auto"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-600 opacity-80"></div>
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-300">
                <span className="font-semibold text-white">32+</span>{' '}
                وبسابت همین حالا طراحی شده است
              </span>
              <ArrowUpLeft className="h-3 w-3 text-purple-400" />
            </motion.div>
          </div>

          <div className="w-full lg:w-auto">
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
            >
              معرفی پلتفرم اختصاصی
              <span className="mr-2 rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">
                جدید
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-12 py-6 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-xl leading-tight text-transparent sm:text-2xl md:text-3xl lg:text-4xl"
            >
              پلی میان <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-gray-300 bg-clip-text text-transparent">
                امکانات روز دنیا و طراحی ایرانی
              </span>
            </motion.h1>

            {/* Animated Stats Row */}
            <motion.div
              variants={itemVariants}
              className="mb-12 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start"
            >
              <div className="rounded-lg border border-purple-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {stats.users}+
                </p>
                <p className="text-xs text-gray-400">کاربران فعال</p>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {stats.transactions}+
                </p>
                <p className="text-xs text-gray-400">افزایش فروش</p>
              </div>
              <div className="rounded-lg border border-indigo-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {stats.networks}+
                </p>
                <p className="text-xs text-gray-400">شبکه سازی</p>
              </div>
            </motion.div>

            {/* Integration badges */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-xs font-medium text-gray-400">
                نرم افزارهای مورد استفاده:
              </span>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                پایتون و جنگو
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                نکست جی اس
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                وردپرس و لاراول
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                بیش از 5 مورد دیگر
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    </section>
  );
}
