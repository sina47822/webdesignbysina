'use client'
import React, {SyntheticEvent, useId, useState} from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignupModal from '@/components/Modals/SignupModal';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
  
// Helper to read XSRF-TOKEN cookie that Sanctum sets
function getCookie(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}
const csrftoken = getCookie('csrftoken') // Django writes this cookie

export default function Page() { // Renamed `page` to `Page`
  const router = useRouter();
  const id = useId();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

    const submit = async (e : SyntheticEvent) => {
      e.preventDefault()
      setSubmitting(true)
      setError(null)
  
      try {
        const res = await fetch(`${API_BASE}/api/auth/login/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken ?? ''
         },
        credentials: 'include',

        body: JSON.stringify({ identifier, password }),
        })
        
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data || `Request failed with ${res.status}`)
          }
          
        // ذخیره توکن‌ها (برای شروع)
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);

        // می‌تونید user رو هم ذخیره کنید
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard')
      } catch (err: any) {
        setError(err?.message ?? 'مشکلی پیش آمد. دوباره تلاش کنید.')
      } finally {
        setSubmitting(false)
      }
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
      <div className='flex flex-col justify-center items-center py-25 px-4 md:px-0'>
        <Card className='flex flex-col justify-center  items-center px-4 md:px-10 md:py-10'>
          <div className='flex flex-col justify-center items-center py-5 md:py-20'>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <Image src="/logo.webp" alt="logo" width={32} height={32} className="rounded-full" />
                </div>
                <header>
                  <h2 className="sm:text-center">Web Design With Sina</h2>
                  <p className="sm:text-center">
                    نام کاربری و رمز عبور خود را برای ورود وارد کنید.
                  </p>
                </header>
              </div>

              <form className="space-y-5" onSubmit={submit} noValidate>
                <div className="space-y-4">
                  <div className="*:not-first:mt-2 pt-6">
                    <Label htmlFor={`${id}-email`}>ایمیل</Label>
                    <Input
                      id={`${id}-identifier`}
                      onChange={e => setIdentifier(e.target.value)}
                      value={identifier}
                      placeholder="یوزر نیم شماره موبایل یا پسورد"
                      required
                    />
                  </div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor={`${id}-password`}>رمز عبور</Label>
                    <Input
                      id={`${id}-password`}
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      placeholder="رمز عبور خود را وارد کنید"
                      type="password"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id={`${id}-remember`} />
                    <Label
                      htmlFor={`${id}-remember`}
                      className="text-muted-foreground font-normal"
                    >
                      رمز عبور را به خاطر بسپار
                    </Label>
                  </div>
                  <a 
                    className="text-sm text-blue-400 underline hover:no-underline" 
                    href="#"
                  >
                    آیا رمز عبور را فراموش کردید؟
                  </a>
                </div>
                {error && (
                  <p className="text-sm text-red-600" role="alert">
                    {error}
                  </p>
                )}
                <Button type="submit" className="w-full cursor-pointer" disabled={submitting}>
                  {submitting ? 'در حال ارسال…' : 'ورود'}
                </Button>
              </form>

              <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                <span className="text-muted-foreground text-xs py-2">یا</span>
              </div>

                <Button type="button" className="w-full cursor-pointer bg-background/50 hover:bg-background text-foreground">
                  <Link href={'/signup'}>
                  عضویت
                  </Link>
                </Button>
          </div>
        </Card>
      </div>
      <div className='hidden items-center justify-center m-auto md:flex'>
        <Image src="/assets/img/dbass-login.png" alt="ورود به سایت" width={800} height={800} className="h-full w-full object-contain" />
      </div>
    </div>
  );
}
