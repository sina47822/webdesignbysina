// /app/features/layout.tsx
'use client'; // این خط برای مشخص کردن اینکه این کامپوننت Client-Side است

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react';

import "../globals.css";
import "./cursor.css";
import Link from 'next/link'
import Header3 from '@/components/Header/Header3';
import {
FaHome, FaHeading, FaBars, FaPhone, FaServer, FaQuestion, FaMedal, FaPager,
FaUsers, FaComment, FaRocket, FaImage, FaTags, FaChartBar, FaTable, FaFileAlt,
FaInfoCircle, FaListUl, FaDollarSign, FaEnvelope,
FaFeather,
FaSearch,
FaTimes
} from 'react-icons/fa'


const sideItems = [
{ title: 'همه قابلیت ها', href: '/features', icon: <FaFeather /> },
{ title: 'هدر', href: '/features/headers', icon: <FaHeading /> },
{ title: 'فوتر', href: '/features/footers', icon: <FaBars /> },
{ title: 'کال‌تو‌اکشن', href: '/features/cta', icon: <FaPhone /> },
{ title: 'دکمه', href: '/features/button', icon: <FaServer /> },
{ title: 'سوالات متداول', href: '/features/faq', icon: <FaQuestion /> },
{ title: 'مدال‌ها', href: '/features/modals', icon: <FaMedal /> },
{ title: 'صفحه‌بندی', href: '/features/paginations', icon: <FaPager /> },
{ title: 'تیم‌ها', href: '/features/teams', icon: <FaUsers /> },
{ title: 'نظرات کاربران', href: '/features/testimonials', icon: <FaComment /> },
{ title: 'هیرو', href: '/features/hero', icon: <FaRocket /> },
{ title: 'نمایش لوگو', href: '/features/logo', icon: <FaImage /> },
{ title: 'محصولات', href: '/features/products', icon: <FaTags /> },
{ title: 'آنالیتیک', href: '/features/analytics', icon: <FaChartBar /> },
{ title: 'داشبورد', href: '/features/dashboard', icon: <FaTable /> },
{ title: 'گزارش‌گیری', href: '/features/reports', icon: <FaFileAlt /> },
{ title: 'درباره ما', href: '/features/about', icon: <FaInfoCircle /> },
{ title: 'قابلیت‌ها', href: '/features/features', icon: <FaListUl /> },
{ title: 'قیمت', href: '/features/pricing', icon: <FaDollarSign /> },
{ title: 'ارتباط با ما', href: '/features/contact', icon: <FaEnvelope /> },
]

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')


  // ایجکسِ ساده: فیلتر روی داده‌های محلی (می‌توان بعداً به fetch از API تغییر داد)
  const results = useMemo(() => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return sideItems.filter(i => i.title.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    const link = document.querySelectorAll<HTMLElement>('.hover-this');
    const cursor = document.querySelector<HTMLElement>('.cursor');

    const animateit = function (this: HTMLElement, e: MouseEvent) {
      const hoverAnim = this.querySelector<HTMLElement>('.hover-anim');
      if (!hoverAnim) return;

      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = this;
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;
      hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
      if (e.type === 'mouseleave') hoverAnim.style.transform = '';
    };

    const editCursor = (e: MouseEvent) => {
      if (!cursor) return;
      const { clientX: x, clientY: y } = e;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    // افزودن event listenerها
    link.forEach((b) => b.addEventListener('mousemove', animateit));
    link.forEach((b) => b.addEventListener('mouseleave', animateit));
    window.addEventListener('mousemove', editCursor);

    document.querySelectorAll<HTMLElement>('a, .cursor-pointer').forEach((el) => {
      el.addEventListener('mousemove', () => {
        cursor?.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        cursor?.classList.remove('cursor-active');
      });
    });

    // پاکسازی event listenerها هنگام unmount
    return () => {
      link.forEach((b) => b.removeEventListener('mousemove', animateit));
      link.forEach((b) => b.removeEventListener('mouseleave', animateit));
      window.removeEventListener('mousemove', editCursor);
      document.querySelectorAll<HTMLElement>('a, .cursor-pointer').forEach((el) => {
        el.removeEventListener('mousemove', () => {
          cursor?.classList.add('cursor-active');
        });
        el.removeEventListener('mouseleave', () => {
          cursor?.classList.remove('cursor-active');
        });
      });
    };
  }, []); // آرایه خالی یعنی این effect فقط یک‌بار اجرا می‌شود
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="cursor" />

      {/* سایدبار راست (فیکس) */}
      <aside className="fixed top-0 right-0 z-40 h-screen w-[20%] overflow-auto bg-gray-100 border-l border-gray-200 p-4">
        <Link href="/" className="flex items-center gap-3 opacity-80 hover:opacity-100">
          <img src="/logo.webp" alt="home" className="bg-gray-300 p-2 rounded-md w-12 h-12" />
          <h3 className="font-bold">خانه</h3>
        </Link>

          {/* دکمه/فرم جستجو (ایجکسی و درجا) */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setSearchOpen(v => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-4 py-2 text-sm font-medium text-white shadow hover:shadow-md"
              aria-expanded={searchOpen}
              aria-controls="features-search-panel"
            >
              <FaSearch />
              <span>جستجوی قابلیت‌ها</span>
            </button>


            {searchOpen && (
            <div id="features-search-panel" className="mt-3 rounded-xl border bg-white p-3 shadow-sm">
              <div className="relative">
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثلاً: هدر، فوتر، هیرو..."
              className="w-full rounded-lg border px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              dir="rtl"
              aria-label="جستجو در قابلیت‌ها"
              />
              {query && (
              <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="پاک کردن جستجو"
              title="پاک کردن"
              >
              <FaTimes />
              </button>
              )}
              </div>


              {/* نتایج */}
              <div className="mt-3 max-h-64 overflow-auto">
              {query === '' ? (
              <p className="text-xs text-gray-500">عبارتی را برای جستجو وارد کنید…</p>
              ) : results.length === 0 ? (
              <p className="text-sm text-gray-600">موردی یافت نشد.</p>
              ) : (
              <ul className="space-y-2">
              {results.map((item) => (
              <li key={item.href}>
              <Link
              href={item.href}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
              <span className="grid place-items-center w-7 h-7 rounded-md bg-gray-200 text-gray-700">
              {/* فقط آیکن خاکستری کوچک به‌جای آیکن اصلی */}
              <FaFeather />
              </span>
              <span className="text-sm font-medium">{item.title}</span>
              </Link>
              </li>
              ))}
              </ul>
              )}
              </div>
            </div>
            )}
          </div>
        <div className="py-5 flex items-center gap-4">
          <span className="text-sm text-gray-500">بخش‌ها</span>
          <span className="flex h-px flex-1 bg-gray-300" />
        </div>


        <nav className="space-y-3">
          {sideItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-200">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-gray-200 text-gray-700">{item.icon}</span>
          <span className="font-medium">{item.title}</span>
          </Link>
          ))}
        </nav>
      </aside>
      {/* هدر فیکس که سمت راستش برای سایدبار خالی شده */}
      <Header3 />
      {/* محتوای اصلی: فاصله از بالا (برای هدر) و از راست (برای سایدبار) */}
      <main className="pt-20 pr-[20%]">
        <div className="mx-auto max-w-[2000px] px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
    </div>

  );
}
