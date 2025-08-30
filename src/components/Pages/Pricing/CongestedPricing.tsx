'use client';

import { buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMediaQuery } from '@react-hook/media-query'; // Removed unused `useMediaQueries` import
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';

// Define your plans
const plans = [
  {
    name: 'شرکتی و رزومه',
    price: '20000000',
    yearlyPrice: '16000000',
    period: 'ماهانه',
    features: [
      'طراحی تک صفحه ای',
      'سئو پایه',
      'پشتیبانی ایمیلی',
      'دو بار طراحی',
      'عضویت در کانال اعضا',
    ],
    description: 'برای معرفی کسب و کار و صفحات لندینگ و شرکت های کوچک عالی است',
    buttonText: 'شروع همکاری',
    href: '/sign-up',
    isPopular: false,
  },
  {
    name: 'فروشگاهی',
    price: '40000000',
    yearlyPrice: '32000000',
    period: 'ماهانه',
    features: [
      'طراحی چند صفحه ای',
      'سئو پایه',
      'پشتیبانی ایمیلی و تلفنی',
      'یک درگاه پرداخت پایه',
      'صفحات درباره ما و تماس با ما',
      'صفحات فروشگاه و محصول تکی',
      'صفحات مقالات و مقاله تکی',
      'صفحات ورود و عضویت و سبد خرید و صفحه پرداخت و داشبورد پایه',
    ],
    description: 'مناسب برای فروشگاه های کوچک و کسب و کارهایی که نیاز به فروش محصولات دارند ',
    buttonText: 'شروع همکاری',
    href: '/sign-up',
    isPopular: true,
  },
  {
    name: 'آموزش آنلاین و رزرو',
    price: '60000000',
    yearlyPrice: '48000000',
    period: 'ماهانه',
    features: [
      'طراحی چند صفحه ای',
      'سئو پایه',
      'پشتیبانی ایمیلی و تلفنی',
      'یک درگاه پرداخت پایه',
      'صفحات درباره ما و تماس با ما',
      'صفحات مقالات و مقاله تکی',
      'صفحات اختصاصی مرحله ای آزمون و رزرو ',
      'صفحات ورود و عضویت و سبد خرید و صفحه پرداخت و داشبورد پایه',
    ],
    description: 'مناسب برای اساتید و هتل ها و کرایه ماشین و ... ',
    buttonText: 'صفحه جزییات',
    href: '/reserve',
    isPopular: false,
  },
];

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

export default function CongestedPricing() {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const switchRef = useRef<HTMLButtonElement | null>(null); // Changed to use correct type

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.right + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          'hsl(var(--primary))',
          'hsl(var(--accent))',
          'hsl(var(--secondary))',
          'hsl(var(--muted))',
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['circle'],
      });
    }
  };

  return (
    <div className="container py-20">
      <div className="group mb-12 space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          قیمت گذاری طراحی وبسایت
        </h2>
        <p className=" text-muted-foreground text-lg whitespace-pre-line">
          این قیمت گذاری پایه برای ورود شما به دنیای کسب و کار اینترنتی که سئو شده و با توجه به همه نیازهای شما طراحی می شود.
          <br />
          اما اگر شما سایت دارید یا طراحی اختصاصی می گردید می توانید می توانید از
        <span className='' ><a href="/special-pricing" className='duration-[.4s] group-hover:text-blue-500 group-hover:font-bold'> این لینک </a></span>
        وارد شوید
        </p>
      </div>

      <div className="mb-10 flex justify-center">
        <label className="relative inline-flex cursor-pointer items-center">
          <Label>
            <Switch
              ref={switchRef} // Correctly typed ref
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
        </label>
        <span className="group mr-2 font-semibold">
          سفارش همراه با 
          <span>
            <a href="/support-pricing" className='px-1 duration-[.4s] group-hover:text-blue-500 group-hover:font-bold'>
             پشتیبانی
            </a>
          </span>
             
          <span className="text-primary">(تخفیف 20%)</span>
        </span>
      </div>

      <div className="sm:2 grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? 30 : index === 0 ? -30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `bg-background relative rounded-2xl border-[1px] p-6 text-center lg:flex lg:flex-col lg:justify-center`,
              plan.isPopular ? 'border-primary border-2' : 'border-border',
              'flex flex-col',
              !plan.isPopular && 'mt-5',
              index === 0 || index === 2
                ? 'z-0 -translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg] transform'
                : 'z-10',
              index === 0 && 'origin-left',
              index === 2 && 'origin-right',
            )}
          >
            {plan.isPopular && (
              <div className="bg-primary absolute top-0 right-0 flex items-center rounded-tr-xl rounded-bl-xl px-2 py-0.5">
                <Star className="text-primary-foreground h-4 w-4 fill-current" />
                <span className="text-primary-foreground ml-1 font-sans font-semibold">
                  پرطرفدار
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <p className="text-muted-foreground text-base font-semibold">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-foreground text-4xl font-bold tracking-tight">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: 'currency',
                      currency: 'IRT',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: 'ease-out',
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== 'Next 3 months' && (
                  <span className="text-muted-foreground text-sm leading-6 font-semibold tracking-wide">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground text-xs leading-5">
                {isMonthly ? 'پرداخت ابتدای هر ماه' : 'پرداخت ابتدای هر ماه'}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="text-primary mt-1 h-4 w-4 flex-shrink-0" />
                    <span className="text-right">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="my-4 w-full" />

              <Link prefetch={false}
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                  }),
                  'group relative w-full gap-2 overflow-hidden text-md font-semibold tracking-tighter',
                  'hover:bg-primary hover:text-primary-foreground hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-1',
                  plan.isPopular
                    ? 'bg-primary text-secondary'
                    : 'bg-background text-foreground',
                )}
              >
                {plan.buttonText}
              </Link>
              <p className="text-muted-foreground mt-6 text-xs leading-5">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
