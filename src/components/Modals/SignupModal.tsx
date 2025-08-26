import { useId } from 'react';
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
  const id = useId();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">عضویت</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
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
            Sign up
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
