'use client'
import React, {SyntheticEvent, useId, useState} from 'react';
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SignupModal() {
  const router = useRouter();
  const id = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const API_BASE = process.env.NEXT_BACKEND_SITE_URL ?? '"http://nginx"'

  const submit = async (e : SyntheticEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, number, password }),
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className='cursor-pointer'>عضویت</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2 ">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <img src="/logo.webp" alt="logo" className="h-8 w-8 rounded-full" />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              عضویت در طراحی سایت با سینا
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              ما برای عضویت شما اطلاعات کمی از شما میخواهیم
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
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
              <Label htmlFor={`${id}-email`}>ایمیل</Label>
              <Input
                  id={`${id}-email`}
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  placeholder="example@gmail.com"
                  type="email"
                  autoComplete="email"
                  required
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-tel`}>موبایل</Label>
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

        {/* <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Continue with Google</Button> */}

        <p className="text-muted-foreground text-center text-xs">
          در صورت عضویت شما شرایط عضویت سایت را مطالعه کرده اید.{' '}
          <a className="underline hover:no-underline" href="#">
            شرایط عضویت در سایت
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}
