// app/search/page.tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { FaSearch } from 'react-icons/fa'


export default function GlobalSearchPage() {
    const router = useRouter()
    const params = useSearchParams()
    const q = params.get('q') || ''


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const input = e.currentTarget.querySelector('input[name="q"]') as HTMLInputElement | null
        const query = input?.value?.trim()
        if (query) router.push(`/search?q=${encodeURIComponent(query)}`)
    }


    return (
        <main className="min-h-[70vh] pt-48">
            <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-4">جستجوی سایت</h1>
                <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                    <div className="relative flex-1">
                        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            name="q"
                            defaultValue={q}
                            placeholder="عبارت موردنظر خود را جستجو کنید..."
                            className="w-full rounded-xl border px-10 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            dir="rtl"
                        />
                    </div>
                    <button type="submit" className="rounded-xl bg-rose-600 px-5 py-3 font-medium text-white hover:bg-rose-700">
                    جستجو
                    </button>
                </form>


                {/* نتایج آزمایشی */}
                {q ? (
                    <div className="space-y-3">
                        <p className="text-gray-600">نتایج برای: <span className="font-semibold">{q}</span></p>
                        <ul className="list-disc pr-6 space-y-1">
                            <li>نتیجهٔ آزمایشی ۱ برای «{q}»</li>
                            <li>نتیجهٔ آزمایشی ۲ برای «{q}»</li>
                        </ul>
                    </div>
                    ) : (
                    <p className="text-gray-500">عبارتی برای جستجو وارد کنید.</p>
                )}
            </div>
        </main>
    )
}