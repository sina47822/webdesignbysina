'use client'
import React, {SyntheticEvent, useId, useState} from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function SignupModal() {
  const router = useRouter();
  const id = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPassword_confirm] = useState('');
  const [number, setNumber] = useState('');
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000'

  const submit = async (e : SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name,username, email, number, password, password_confirm }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Request failed with ${res.status}`)
        }

      router.push('/signin')
    } catch (err: any) {
      setError(err?.message ?? 'مشکلی پیش آمد. دوباره تلاش کنید.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
      <div className='flex flex-col justify-center items-center py-20 px-10 md:px-0'>
        <Card className='flex flex-col justify-center  items-center px-10 py-10'>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <Image src="/logo.webp" alt="logo" width={32} height={32} className="rounded-full" />
            </div>
            <header className='py-5'>
              <h2 className="sm:text-center text-xl md:text-2xl lg:text-3xl">
                عضویت در طراحی سایت با سینا
              </h2>
              <p className="sm:text-center">
                ما برای عضویت شما اطلاعات کمی از شما میخواهیم
              </p>
            </header>
          </div>

          <form className="space-y-5" onSubmit={submit} noValidate>
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>نام کامل</Label>
                <Input
                  id={`${id}-name`}
                  onChange={e => setName(e.target.value)}
                  value={name}
                  placeholder="سینا افشار"
                  type="text"
                  autoComplete="name"
                  required
                />
              </div>
              
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-username`}>نام کاربری</Label>
                <Input
                  id={`${id}-username`}
                  onChange={e => setUsername(e.target.value)}
                  value={username}
                  placeholder="sina-afshar"
                  type="text"
                  
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-email`}>ایمیل</Label>
                <Input
                  id={`${id}-email`}
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  placeholder="example@gmail.com"
                  type="email"
                  autoComplete="email"
                  
                />
              </div>

              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-phone`}>شماره موبایل</Label>
                <Input
                  id={`${id}-phone`}
                  onChange={e => setNumber(e.target.value)}
                  value={number}
                  placeholder="09120000000"
                  type="tel"
                  inputMode="tel"
                  pattern="^09\d{9}$"
                  autoComplete="tel"
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
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-password_confirm`}>رمز عبور</Label>
                <Input
                  id={`${id}-password_confirm`}
                  onChange={e => setPassword_confirm(e.target.value)}
                  value={password_confirm}
                  placeholder="رمز عبور خود را وارد کنید"
                  type="password"
                  autoComplete="password"
                  minLength={8}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
              {error}
              </p>
            )}

            <Button type="submit" className="w-full cursor-pointer" disabled={submitting}>
              {submitting ? 'در حال ارسال…' : 'عضویت'}
            </Button>
          </form>

          <p className="text-muted-foreground text-center text-md py-10 max-w-md">
            در صورت عضویت شما شرایط عضویت سایت را مطالعه کرده اید.{' '}
            <a className="underline hover:no-underline" href="#">
              شرایط عضویت در سایت
            </a>
            .
          </p>
        </Card>
      </div>

      <div className='hidden items-center justify-center m-auto md:flex'>
        <Image src="/assets/img/dbass-login.png" alt="ورود به سایت" width={800} height={800} className="h-full w-full object-contain" />
      </div>
    </div>

  );
}
