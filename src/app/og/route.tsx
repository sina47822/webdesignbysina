// app/og/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ابعاد استاندارد: 1200×630 پیکسل (نسبت ~ 1.91:1).

// کنتراست بالا: متن/لوگو باید واضح روی بک‌گراند خوانده شود؛ سفید روی تیره یا برعکس.

// ناحیه‌ی امن: در موبایل/پریویوها ممکن است کراپ شود. محتوا را ~60px از لبه‌ها فاصله بده.

// فونت فارسی: در OGهای دینامیک (مثل app/og/route.tsx) اگر فونت فارسی را Embed نکنی، ممکن است حروف جدا/شکسته بیافتد یا فانت پیش‌فرض بیاد.

// برای دینامیک OG با next/og، فونت فارسی (WOFF/TTF) را با fetch بخوان و به ImageResponse بده تا درست رندر شود.

// برای استاتیک OG (فایل JPG/PNG)، با همان فونت رندر کن و خروجی را کنار پروژه بگذار.

// وزن فونت: برای رندر شبکه‌های اجتماعی از وزن‌های 500–700 استفاده کن (وزن‌های خیلی نازک در فشرده‌سازی شبکه‌ها به‌هم می‌ریزه).

// متن کم و درشت: عنوان کوتاه، زیرتیتر یک‌خطی، لوگوی تمیز.

// فایل بهینه: JPG با کیفیت 80–85 یا PNG (اگر گرافیک تخت/شفافیت داری).

// تست حتماً: با Card Validator توییتر و Sharing Debugger فیسبوک/متا تست کن.

export async function GET() {
  // فونت فارسی را embed کن
  const dana = await fetch(
    new URL("../../public/fonts/dana-regular.woff", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0e",
          color: "#fff",
          padding: "60px",
          fontFamily: "Dana",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 960 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
            وب‌سایت‌های SEO-First با Next.js + Django
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>
            WebDesignWithSina — Performance, Accessibility, GEO Marketing
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Dana", data: dana, style: "normal", weight: 400 }],
    }
  );
}