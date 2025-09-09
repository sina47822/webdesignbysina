import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';

/**
 * صفحه قیمت‌گذاری طراحی سایت (نسخه TypeScript/TSX)
 * - سه پلن با توضیحات، قیمت و لیست امکانات
 * - طراحی راست‌به‌چپ + Tailwind
 * - برجسته‌سازی پلن محبوب برای افزایش تبدیل
 */

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaLink: string;
  popular?: boolean;
  badge?: string;
};

const designPlans: Plan[] = [
  {
    name: 'پکیج شرکتی و رزومه',
    price: 'IRT 20,000,000 / سالانه',
    description:
      'برای معرفی کسب‌وکار، لندینگ و شرکت‌های کوچک. سایت تک‌صفحه‌ای سریع و سئو شده.',
    features: [
      'طراحی تک‌صفحه‌ای واکنش‌گرا',
      'سئو و بهینه‌سازی اولیه',
      'پشتیبانی ایمیلی + یک نوبت اصلاح',
      'فرم تماس و عضویت کاربران',
      'پنل مدیریت ساده محتوا',
    ],
    ctaLink: '/contact?plan=company',
  },
  {
    name: 'پکیج فروشگاهی',
    price: 'IRT 40,000,000 / سالانه',
    description:
      'مناسب فروشگاه‌های کوچک و کسب‌وکارهایی که نیاز به فروش آنلاین دارند.',
    features: [
      'طراحی چندصفحه‌ای کاملاً واکنش‌گرا',
      'سئوی پیشرفته + اسکیما',
      'پشتیبانی ایمیل و تلفن (۲ نوبت اصلاح)',
      'صفحات فروشگاه/محصول/سبد خرید',
      'اتصال یک درگاه پرداخت امن',
      'وبلاگ با مقالات تکی و دسته‌بندی',
    ],
    ctaLink: '/contact?plan=shop',
    badge: 'پرفروش',
  },
  {
    name: 'پکیج آموزش آنلاین و رزرو',
    price: 'IRT 60,000,000 / سالانه',
    description:
      'برای اساتید، مراکز آموزشی، هتل‌ها و کلینیک‌ها با نیاز رزرو/آزمون آنلاین.',
    features: [
      'طراحی چندصفحه‌ای + امکانات پیشرفته',
      'سیستم رزرو آنلاین و آزمون مرحله‌ای',
      'پشتیبانی ایمیل و تلفن (۳ نوبت اصلاح)',
      'ورود/ثبت‌نام با ایمیل یا OTP',
      'PWA و امکان تبدیل به اپ',
      'باشگاه مشتریان و کد تخفیف',
    ],
    ctaLink: '/contact?plan=booking',
  },
];

const NextPricingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>قیمت‌گذاری طراحی سایت | WebDesignWithSina</title>
        <meta
          name="description"
          content="پلن‌های طراحی سایت با امکانات و شرایط کاری متفاوت؛ مناسب شرکتی، فروشگاهی و آموزش آنلاین."
        />
      </Head>

      <main dir="rtl" className="bg-gray-50 py-12 px-4">
        <section className="mx-auto max-w-5xl text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            قیمت‌گذاری طراحی وبسایت
          </h1>
          <p className="text-gray-600">
            پلن مناسب کسب‌وکار خود را انتخاب کنید؛ همه پلن‌ها قابلیت شخصی‌سازی دارند.
          </p>
        </section>

        <section className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {designPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                plan.popular ? 'border-indigo-500 ring-1 ring-indigo-200' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-6 select-none rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white shadow">
                  {plan.badge ?? 'محبوب'}
                </span>
              )}

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{plan.name}</h2>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-4 text-xl font-extrabold text-indigo-600">{plan.price}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <span className="ml-2 text-green-500">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.ctaLink}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
              >
                شروع همکاری
              </Link>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-xl text-center text-gray-700">
          <p>
            همه پلن‌ها شامل <strong className="text-orange-600">۷ روز تست رایگان</strong> هستند.
            اگر پلن اختصاصی می‌خواهید،{' '}
            <Link href="/contact?plan=custom" className="font-semibold text-indigo-600 hover:underline">
              با ما تماس بگیرید
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
};

export default NextPricingPage;
