import { useId } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SignupModal from '@/components/Modals/SignupModal';
import { Card } from '@/components/ui/card';

export default function page() {
  const id = useId();
  return (
    <div className='grid grid-cols-2 h-full'>
      <div className='flex flex-col justify-center items-center py-20 px-10 md:px-0'>
        <Card className='flex flex-col justify-center  items-center px-10 py-10'>
          <div className='flex flex-col justify-center items-center py-20'>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <img src="/logo.webp" alt="logo" className="h-8 w-8 rounded-full" />
                </div>
                <header>
                  <h2 className="sm:text-center">Web Design With Sina</h2>
                  <p className="sm:text-center">
                    نام کاربری و رمز عبور خود را برای ورود وارد کنید.
                  </p>
                </header>
              </div>

              <form className="space-y-5">
                <div className="space-y-4">
                  <div className="*:not-first:mt-2">
                    <Label htmlFor={`${id}-email`}>ایمیل</Label>
                    <Input
                      id={`${id}-email`}
                      placeholder="example@gmail.com"
                      type="email"
                      required
                    />
                  </div>
                  <div className="*:not-first:mt-2">
                    <Label htmlFor={`${id}-password`}>رمز عبور</Label>
                    <Input
                      id={`${id}-password`}
                      placeholder="رمز عبور خود را وارد کنید"
                      type="password"
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
                <Button type="button" className="w-full">
                  ورود
                </Button>
              </form>

              <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                <span className="text-muted-foreground text-xs">یا</span>
              </div>

              <SignupModal />
          </div>
        </Card>
      </div>
      <div className='relative hidden items-center justify-center m-auto md:flex'>
        <img src="/assets/img/dbass-login.png" alt="ورود به سایت" className='h-full w-full'/>
      </div>
    </div>

  );
}
