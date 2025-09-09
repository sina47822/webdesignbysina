// app/features/not-found.tsx
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaHome, FaEnvelope, FaArrowRight, FaSearch } from 'react-icons/fa'


export default function NotFoundFeatures() {
    const router = useRouter()

    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const input = form.querySelector('input[name="q"]') as HTMLInputElement | null
        const q = input?.value?.trim()
        if (q) {
        // اگر صفحهٔ سرچ داری، مسیرش را اینجا عوض کن
        router.push(`/ ?q=${encodeURIComponent(q)}`.replace(' ', ''))
        }
    }


    return (
        <main className="min-h-[80vh] pt-24 pr-[20%] flex items-center">
            <section className="mx-auto max-w-2xl w-full px-6">
                <div className="rounded-2xl border bg-white p-8 shadow-sm">
                    <span className="inline-block rounded-full border px-3 py-1 text-xs text-gray-600">خطا ۴۰۴</span>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight">الصفحه/المتن پیدا نشد</h1>
                    <p className="mt-2 text-gray-600">
                        متأسفانه صفحه‌ای که به‌دنبالش بودید پیدا نشد. ممکنه آدرس تغییر کرده باشه یا صفحه حذف شده باشه.
                    </p>


                    {/* جعبهٔ جستجو (اختیاری) */}
                    <form onSubmit={onSearch} className="mt-6 flex gap-2">
                        <div className="relative flex-1">
                            <FaSearch className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                            name="q"
                            type="text"
                            placeholder="جستجوی محتوای مرتبط..."
                            className="w-full rounded-xl border px-10 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                            dir="rtl"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-xl bg-rose-600 px-5 py-3 font-medium text-white hover:bg-rose-700"
                        >
                            جستجو  
                        </button>
                    </form>


                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Link href="/" className="group flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                                <span className="grid h-9 w-9 place-items-center rounded-md bg-gray-200 text-gray-700"><FaHome /></span>
                                <span className="font-medium">رفتن به خانه</span>
                            </div>
                            <FaArrowRight className="opacity-50 transition group-hover:translate-x-1" />
                        </Link>


                        <button
                            onClick={() => router.back()}
                            className="group flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-2">
                                <span className="grid h-9 w-9 place-items-center rounded-md bg-gray-200 text-gray-700"><FaArrowRight /></span>
                                <span className="font-medium">برگشت به صفحهٔ قبل</span>
                            </div>
                            <FaArrowRight className="opacity-50 transition group-hover:translate-x-1" />
                        </button>


                        <Link href="/contact" className="group flex items-center justify-between rounded-xl border px-4 py-3 hover:bg-gray-50">
                            <div className="flex items-center gap-2">
                            <span className="grid h-9 w-9 place-items-center rounded-md bg-gray-200 text-gray-700"><FaEnvelope /></span>
                            <span className="font-medium">ارتباط با ما</span>
                            </div>
                            <FaArrowRight className="opacity-50 transition group-hover:translate-x-1" />
                        </Link>
                    </div>


                    <p className="mt-6 text-sm text-gray-500">
                    اگر فکر می‌کنید این یک خطای سیستمی است، لطفاً به ما اطلاع دهید.
                    </p>
                </div>
            </section>
        </main>
    )
}