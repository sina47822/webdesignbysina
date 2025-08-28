// app/features/search/page.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaSearch, FaListUl } from 'react-icons/fa'

const featuresData = [
  { title: 'هدر', href: '/features/headers', desc: 'نمونه هدرها' },
  { title: 'فوتر', href: '/features/footers', desc: 'نمونه فوترها' },
  { title: 'کال‌تو‌اکشن', href: '/features/cta', desc: 'بخش CTA' },
  { title: 'سوالات متداول', href: '/features/faq', desc: 'FAQ' },
  { title: 'هیرو', href: '/features/hero', desc: 'بخش Hero' },
  { title: 'نمایش لوگو', href: '/features/logo', desc: 'لوگوها' },
  { title: 'تیم‌ها', href: '/features/teams', desc: 'اعضای تیم' },
  { title: 'نظرات کاربران', href: '/features/testimonials', desc: 'نظرات کاربران' },
  // ... بقیه موارد
]
export default function FeaturesSearchPage() {
    const [query, setQuery] = useState('')
    
    const results = featuresData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <main className="min-h-[70vh] pt-24 pr-[20%]">
            <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                <FaSearch className="text-rose-600" />
                <h1 className="text-2xl font-bold">جستجو در قابلیت‌ها</h1>
                </div>

                <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="قابلیت موردنظر خود را جستجو کنید..."
                        className="w-full rounded-xl border px-10 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        dir="rtl"
                    />
                </div>
                </div>

                {query.length > 0 && (
                results.length > 0 ? (
                    <ul className="space-y-3">
                    {results.map((item, i) => (
                        <li key={i} className="rounded-lg border p-4 hover:bg-gray-50 transition cursor-pointer">
                            <Link href={item.href} className="font-semibold text-rose-600 hover:underline">
                                {item.title}
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </Link>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">نتیجه‌ای پیدا نشد.</p>
                )
                )}
            </div>
        </main>
    )
}