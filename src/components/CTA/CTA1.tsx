import { Globe, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CTA1() {
  return (
    <div className="w-full">
      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-20">
        <div
          className="relative isolate w-full overflow-hidden rounded-2xl"
          style={{
            background:
              'linear-gradient(100.5deg,rgba(57,18,241,.4) 29.55%,rgba(164,129,255,.4) 93.8%),radial-gradient(38.35% 93.72% at 18.31% 6.28%,rgba(170,135,252,.8) 0,rgba(61,27,205,.8) 100%)',
          }}
        >
          <img
            alt="bg"
            loading="lazy"
            width="1840"
            height="694"
            className="absolute top-0"
            src="/assets/cta/grid.svg"
          />
          <div className="relative isolate overflow-hidden px-4 py-12 sm:px-24">
            <p className="w-fit rounded-2xl bg-white px-4 py-1 text-center text-base leading-7 font-semibold text-black uppercase lg:text-left">
              ارتباط با ما
            </p>
            <h2 className="mt-3 max-w-lg text-4xl font-semibold text-white md:text-6xl">
              چطور به ما <span className="text-primary-2"> دسترسی </span>پیدا کنید؟
            </h2>
            <p className="my-auto mt-3 max-w-2xl text-base text-gray-300 md:text-lg">
              اگر شما میخواهید با ما در ارتباط باشید راه های مختلفی برای آن وجود دارد
            </p>
            <div className="mt-8 flex w-full flex-col justify-between gap-4 text-lg md:flex-row">
              <a
                className="flex items-center gap-2 text-white"
                href="mailto:sinaa.afshar@gmail.com"
              >
                <Mail className="h-7 w-7 text-red-500" />
                sinaa.afshar@gmail.com
              </a>
              <a className="flex items-center gap-2 text-white" href="#">
                <Phone className="h-7 w-7 text-green-500" />
                09192001923
              </a>
              <Link prefetch={false} className="flex items-center gap-2 text-white" href="/">
                <Globe className="h-7 w-7 text-blue-500" />
                webdesignwithsina.ir
              </Link>
            </div>
            <ul className="mt-8 ml-4 list-disc text-sm text-gray-300 md:text-base">
              <li>میتوانید درخواست خود را از طریق ارسال کلمه سفارش در مسیج یا ایمیل یا تلگرام یا اینستاگرام برای ما ثبت کنید</li>
              <li>
                ما با دریافت کلمه سفارش از شما فرم همکاری را برای شما ارسال میکنیم و در صورتی که شما موافق همکاری با ما باشید میتوانید از طریق ارسال کلمه توافق فرم قرارداد را دریافت و به بستن قرارداد دوطرفه اقدام کنید 
              </li>
            </ul>
          </div>
        </div>
      <div className="absolute left-auto -bottom-40 left-1/2 h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-200/30 blur-[80px] lg:left-96 lg:left-auto lg:translate-x-0"></div>
      <div className="absolute left-auto -bottom-40 left-1/2 h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-200/30 blur-[80px] lg:left-96 lg:left-auto lg:translate-x-0"></div>
      <div className="absolute left-auto -bottom-40 left-1/2 h-96 w-20 -translate-x-1/2 -rotate-45 rounded-full bg-gray-200/30 blur-[80px] lg:left-96 lg:left-auto lg:translate-x-0"></div>
      </section>
    </div>
  );
}
