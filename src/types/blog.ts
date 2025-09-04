export type CalloutType = "info" | "warning" | "success" | "error";

export interface BlogMeta {
  title: string;
  description?: string;
  slug: string;
  date: string;          // ISO (e.g. "2025-08-10")
  lastModified?: string; // ISO
  cover?: string;        // URL یا مسیر داخلی
  tags?: string[];
  draft?: boolean;
  canonical?: string;
}

export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface SectionCode {
  language?: string;     // مثل 'ts', 'js', 'bash'
  content: string;       // خود کد
  caption?: string;
  filename?: string;
}

export interface SectionCallout {
  type: CalloutType;
  content: string;       // متن کال‌اوت (Markdown مجاز)
}

export interface Section {
  id?: string;           // اختیاری برای انکر
  title: string;
  level: 2 | 3 | 4;      // H1 همیشه از meta.title میاد؛ این‌ها H2/H3/H4 هستن
  bodyMd?: string;       // متن به صورت Markdown (GFM)
  bodyHtml?: string;     // یا HTML خام (اگر بخوای «مثل HTML» کار کنی)
  image?: SectionImage;
  code?: SectionCode;
  callout?: SectionCallout;
}

export interface BlogDoc {
  meta: BlogMeta;
  sections: Section[];
}
