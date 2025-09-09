'use client'
import React from 'react';

/**
 * صفحهٔ قیمت‌گذاری طراحی وب‌سایت
 *
 * این فایل یک صفحهٔ Next.js به زبان تایپ‌اسکریپت است که
 * پلن‌های مختلف طراحی سایت را به‌صورت کارت‌های قیمت ارائه می‌دهد.
 * اطلاعات پلن‌ها با الهام از صفحهٔ «لیست قیمت» وب‌سایت
 * webdesignwithsina.ir استخراج شده‌اند. در آن صفحه سه پلن
 * «شرکتی و رزومه»، «فروشگاهی» و «آموزش آنلاین و رزرو» با قیمت‌های
 * سالانه به همراه ویژگی‌های هرکدام معرفی شده است【752462443355983†L20-L84】.
 * علاوه بر این، ساختار صفحهٔ تعرفهٔ شاپفا جهت الهام برای ارائهٔ
 * امکانات پیشرفته‌تر مورد بررسی قرار گرفت که سه سطح امکانات
 * «کاربردی»، «حرفه‌ای» و «پیشرفته» را شامل می‌شود【759830832554866†L40-L86】.
 *
 * کاربر می‌تواند با انتخاب پلن مناسب، توضیحات و مزایای آن را مشاهده
 * و برای شروع همکاری اقدام کند. همچنین یک بخش شرایط همکاری
 * در پایین صفحه قرار دارد که نحوهٔ پرداخت و اصول قراردادی را
 * توضیح می‌دهد، این بخش برگرفته از نکات قراردادی رایج است که در
 * مقالات حقوقی پیشنهاد شده‌اند【494887876250768†L174-L192】.
 */

// تعریف نوع دادهٔ پلن
interface Plan {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  note?: string;
  highlight?: boolean;
}

// تعریف داده‌های پلن‌ها بر اساس اطلاعات صفحات موجود
const plans: Plan[] = [
  {
    id: 'company',
    title: 'شرکتی و رزومه',
    price: '۲۰,۰۰۰,۰۰۰',
    period: 'سالانه',
    description:
      'برای معرفی کسب و کار و صفحات لندینگ و شرکت‌های کوچک عالی است【752462443355983†L45-L46】.',
    features: [
      'طراحی تک‌صفحه‌ای【752462443355983†L35-L39】',
      'سئو پایه【752462443355983†L35-L39】',
      'پشتیبانی ایمیلی【752462443355983†L35-L39】',
      'دو بار طراحی (ریویژن)',
      'عضویت در کانال اعضا【752462443355983†L35-L39】'
    ],
    cta: 'شروع همکاری',
    note: 'پرداخت ابتدای هر ماه【752462443355983†L31-L34】',
    highlight: false
  },
  {
    id: 'store',
    title: 'فروشگاهی',
    price: '۴۰,۰۰۰,۰۰۰',
    period: 'سالانه',
    description:
      'مناسب برای فروشگاه‌های کوچک و کسب‌وکارهایی که نیاز به فروش محصولات دارند【752462443355983†L68-L69】.',
    features: [
      'طراحی چندصفحه‌ای【752462443355983†L55-L56】',
      'سئو پایه【752462443355983†L55-L56】',
      'پشتیبانی ایمیلی و تلفنی【752462443355983†L55-L58】',
      'یک درگاه پرداخت پایه【752462443355983†L58-L62】',
      'صفحات درباره ما و تماس با ما【752462443355983†L59-L62】',
      'صفحات فروشگاه و محصول تکی【752462443355983†L60-L62】',
      'صفحات مقالات و مقاله تکی【752462443355983†L61-L62】',
      'صفحات ورود، عضویت، سبد خرید، پرداخت و داشبورد پایه【752462443355983†L61-L63】'
    ],
    cta: 'شروع همکاری',
    note: 'پرداخت ابتدای هر ماه【752462443355983†L51-L54】',
    highlight: true
  },
  {
    id: 'education',
    title: 'آموزش آنلاین و رزرو',
    price: '۶۰,۰۰۰,۰۰۰',
    period: 'سالانه',
    description:
      'مناسب برای اساتید، هتل‌ها، مراکز رزرو و کسب‌وکارهایی که به زمان‌بندی و رزرو نیاز دارند【752462443355983†L70-L89】.',
    features: [
      'طراحی چندصفحه‌ای【752462443355983†L76-L83】',
      'سئو پایه【752462443355983†L76-L83】',
      'پشتیبانی ایمیلی و تلفنی【752462443355983†L76-L83】',
      'یک درگاه پرداخت پایه【752462443355983†L76-L83】',
      'صفحات درباره ما و تماس با ما【752462443355983†L80-L83】',
      'صفحات مقالات و مقاله تکی【752462443355983†L80-L83】',
      'صفحات اختصاصی مرحله‌ای آزمون و رزرو【752462443355983†L82-L83】',
      'صفحات ورود، عضویت، سبد خرید، پرداخت و داشبورد پایه【752462443355983†L81-L83】'
    ],
    cta: 'صفحه جزئیات',
    note: 'پرداخت ابتدای هر ماه【752462443355983†L72-L75】',
    highlight: false
  }
];

const PricingPage = () => {
  return (
    <div className="pricing-container" dir="rtl">
      <header className="pricing-header">
        <h1>قیمت‌گذاری طراحی وبسایت</h1>
        <p>
          این قیمت‌گذاری پایه برای ورود شما به دنیای کسب‌وکار اینترنتی طراحی شده و
          شامل سه پلن متنوع بر اساس نیازهای متفاوت است【752462443355983†L20-L25】.
          اگر به‌دنبال طراحی اختصاصی یا امکانات بیشتر هستید، پلن‌ها قابل سفارشی‌سازی
          هستند و می‌توان ویژگی‌هایی مانند فضای هاست بیشتر، اپلیکیشن موبایل، کد تخفیف
          و ابزارهای بازاریابی را مطابق پلن‌های پیشرفتهٔ شاپفا اضافه کرد【759830832554866†L40-L86】.
        </p>
        <p className="support-note">
          سفارش همراه با پشتیبانی شامل ۲۰٪ تخفیف می‌شود【752462443355983†L27-L27】.
        </p>
      </header>

      <section className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.highlight ? 'highlight' : ''}`}
          >
            <h2 className="plan-title">{plan.title}</h2>
            <div className="plan-price-wrapper">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">{plan.period}</span>
            </div>
            <p className="plan-desc">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            {plan.note && <p className="plan-note">{plan.note}</p>}
            <button className="plan-button">{plan.cta}</button>
          </div>
        ))}
      </section>

      <section className="conditions">
        <h2>شرایط همکاری و نحوهٔ پرداخت</h2>
        <p>
          برای شروع هر پروژه، قراردادی شفاف تنظیم می‌شود که محدودهٔ تعهدات
          کارفرما و طراح را به‌طور دقیق مشخص می‌کند تا از بروز سوءتفاهم جلوگیری شود【494887876250768†L142-L156】.
        </p>
        <ul>
          <li>
            <strong>تقسیم پرداخت:</strong> هزینهٔ پروژه به‌صورت مرحله‌ای دریافت
            می‌شود؛ ۲۵٪ هنگام عقد قرارداد، ۲۵٪ در میانهٔ پروژه و ۵۰٪ پس از تحویل
            نهایی【494887876250768†L174-L192】.
          </li>
          <li>
            <strong>زمان‌بندی:</strong> زمان تحویل پروژه بر اساس پیچیدگی کار تعیین
            می‌شود و در قرارداد ذکر خواهد شد.
          </li>
          <li>
            <strong>اصلاحات:</strong> پس از هر مرحله، نسخهٔ آزمایشی به کارفرما ارائه
            می‌شود تا تغییرات مورد نیاز را اعلام کند. اصلاحات خارج از محدودهٔ توافق
            مشمول هزینهٔ اضافی خواهد بود【494887876250768†L142-L168】.
          </li>
          <li>
            <strong>پشتیبانی:</strong> تمامی پلن‌ها شامل یک دورهٔ پشتیبانی پایه
            هستند؛ در صورت نیاز می‌توانید پشتیبانی حرفه‌ای دریافت کنید.
          </li>
        </ul>
      </section>

      {/* سبک‌های محلی با استفاده از styled-jsx */}
      <style jsx>{`
        .pricing-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: sans-serif;
          color: #333;
          line-height: 1.7;
        }
        .pricing-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .pricing-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .pricing-header p {
          font-size: 1rem;
          color: #555;
          margin-bottom: 0.25rem;
        }
        .support-note {
          font-size: 0.9rem;
          color: #b36b00;
          margin-top: 0.5rem;
        }
        .plans-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }
        .plan-card {
          background: #f9f9f9;
          border: 1px solid #e5e5e5;
          border-radius: 8px;
          width: 100%;
          max-width: 300px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .plan-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .plan-card.highlight {
          border: 2px solid #0070f3;
          background: #f0f8ff;
        }
        .plan-title {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #0070f3;
        }
        .plan-price-wrapper {
          display: flex;
          align-items: baseline;
          margin-bottom: 0.5rem;
        }
        .plan-price {
          font-size: 1.4rem;
          font-weight: bold;
          margin-left: 0.25rem;
        }
        .plan-period {
          font-size: 0.9rem;
          color: #666;
        }
        .plan-desc {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 1rem;
          min-height: 60px;
        }
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
        }
        .plan-features li {
          margin-bottom: 0.5rem;
          padding-right: 1rem;
          position: relative;
        }
        .plan-features li:before {
          content: '✔';
          position: absolute;
          right: 0;
          color: #0070f3;
        }
        .plan-note {
          font-size: 0.85rem;
          color: #999;
          margin-bottom: 1rem;
        }
        .plan-button {
          background: #0070f3;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .plan-button:hover {
          background: #005bb5;
        }
        .conditions {
          margin-top: 3rem;
          background: #fffaf3;
          border: 1px solid #ffecb5;
          padding: 1.5rem;
          border-radius: 8px;
        }
        .conditions h2 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
          color: #b36b00;
        }
        .conditions ul {
          list-style: none;
          padding: 0;
        }
        .conditions li {
          margin-bottom: 0.75rem;
          padding-right: 1rem;
          position: relative;
        }
        .conditions li strong {
          color: #b36b00;
        }
        .conditions li:before {
          content: '•';
          position: absolute;
          right: 0;
          color: #b36b00;
        }
      `}</style>
    </div>
  );
};

export default PricingPage;