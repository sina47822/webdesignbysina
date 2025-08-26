import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { PlusIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';

const items = [
  {
    id: '1',
    title: 'چه چیزی کار کردن با سینا را خاص می کند؟',
    content:
      'سعی ما همیشه بر آن بوده تا از بهترین امکانات روز دنیا برای سریع تر شدن که به طبع آن قیمت محصول نهایی را پایین می آورد تا بهترین طراحی های روز دنیا استفاده شود تا مشتری ما هم رضابت داشته باشد در انتهای کار و هم باعث شود محصول نهایی خاص باشد و به هدف ما که جایگاه سازی برای مخاطبانمان است دست یابد',
  },
  {
    id: '2',
    title: 'چطور میتوانم برای طراحی بخش خاصی از وبسایت اقدام کنم؟',
    content:
      'ما سعی کردیم از بهترین طراحی های روز دنیا استفاده کنیم و همه نیازهای مخاطب خود را که سریع ارائه شدن خاص بودن و برطرف کننده نیاز بودن مشتری هست  را ارائه دادیم اما اگر بازهم طرح شما میان طرح های ما نبود میتوانید با ثبت درخواست از طریق ایمیل یا فرم اختصاصی بالا این درخواست را ثبت کنید تا پس از بررسی مالی آن برای شما فاکتور مجزا ارائه شود',
  },
  {
    id: '3',
    title: 'آیا بخش های سایت ریسپانسیو است و در گوشی و دسکتاپ متفاوت است؟',
    content:
      "کاملا! همه قسمت های سایت به صورت ریسپانسیو طراحی شده است و در 4 حالت موبایل صفحه کوچک و صفجه بزرگ و صفحه خیلی بزرگ طراحی انجام شده است",
  },
  {
    id: '4',
    title: 'آیا میتوانم برای فروشگاه سازی از خدمات شما بهره مند شوم؟',
    content:
      'بله کاملا! ما همه امکانات لازم برای طراحی سایت شرکتی، رزومه، فروشگاهی،آموزشی و رزرو آنلاین را فراهم کرده ایم',
  },
  {
    id: '5',
    title: 'چطور میتوانم با شما همکاری کنم؟',
    content:
      "به سادگی! شما میتوانید با ثبت درخواست خود به صورت آنلاین یا با تماس تلفنی فرم طراحی را دریافت و با پرداخت پیش پرداخت همکاری خودبا ما را آغاز کنید",
  },
];

export default function Faq1() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            سوالات متداول{' '}
            <span className="from-primary bg-gradient-to-r to-rose-200 bg-clip-text text-transparent">
              از ما
            </span>
          </h2>
          <p
            className="text-muted-foreground mx-auto max-w-2xl"
          >
            همه سوالاتی که شما برای شروع همکاری با ما ممکن است بپرسید در اینجا سعی شده قرار داده شود اگر سوالی خارج از اینها دارید میتوانید از طریق ایمیل سوال خود را مطرح کنید
          </p>
        </div>

        <div
          className="relative mx-auto max-w-3xl"
        >
          {/* Decorative gradient */}
          <div className="bg-primary/10 absolute -top-4 -left-4 -z-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute -right-4 -bottom-4 -z-10 h-72 w-72 rounded-full blur-3xl" />

          <Accordion
            type="single"
            collapsible
            className="border-border/40 bg-card/30 w-full rounded-xl border p-2 backdrop-blur-sm"
            defaultValue="1"
          >
            {items.map((item, index) => (
              <div
                key={item.id}
              >
                <AccordionItem
                  value={item.id}
                  className={cn(
                    'bg-card/50 my-1 overflow-hidden rounded-lg border-none px-2 shadow-sm transition-all',
                    'data-[state=open]:bg-card/80 data-[state=open]:shadow-md',
                  )}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        'group flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium',
                        'hover:text-primary transition-all duration-300 outline-none',
                        'focus-visible:ring-primary/50 focus-visible:ring-2',
                        'data-[state=open]:text-primary',
                      )}
                    >
                      {item.title}
                      <PlusIcon
                        size={18}
                        className={cn(
                          'text-primary/70 shrink-0 transition-transform duration-300 ease-out',
                          'group-data-[state=open]:rotate-45',
                        )}
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent
                    className={cn(
                      'text-muted-foreground overflow-hidden pt-0 pb-4',
                      'data-[state=open]:animate-accordion-down',
                      'data-[state=closed]:animate-accordion-up',
                    )}
                  >
                    <div className="border-border/30 border-t pt-3">
                      {item.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
