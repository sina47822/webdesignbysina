import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function SignupModal() {
  const id = useId();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-full'>
      <div className='flex flex-col justify-center items-center py-20 px-10 md:px-0'>
        <Card className='flex flex-col justify-center  items-center px-10 py-10'>
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <img src="/logo.webp" alt="logo" className="h-8 w-8 rounded-full" />
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

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-name`}>نام کامل</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="سینا افشار"
                  type="text"
                  required
                />
              </div>
              
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
                <Label htmlFor={`${id}-phone`}>شماره موبایل</Label>
                <Input
                  id={`${id}-phone`}
                  placeholder="09120000000"
                  type="phone"
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
            <Button type="button" className="w-full">
              عضویت
            </Button>
          </form>

          {/* <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
            <span className="text-muted-foreground text-xs">Or</span>
          </div>

          <Button variant="outline">Continue with Google</Button> */}

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
        <img src="/assets/img/dbass-login.png" alt="ورود به سایت" className='h-full w-full'/>
      </div>
    </div>

  );
}
