import { useId } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import SignupModal from './SignupModal';
import { FaUser } from 'react-icons/fa';

export default function SigninModal() {
  const id = useId();
  return (
    <Dialog>
      <DialogTrigger asChild>
        
        <Button variant="secondary" className='cursor-pointer rounded-full px-6 hover:scale-[1.1]'> <FaUser /></Button>
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
            <DialogTitle className="sm:text-center">Web Design With Sina</DialogTitle>
            <DialogDescription className="sm:text-center">
              نام کاربری و رمز عبور خود را برای ورود وارد کنید.
            </DialogDescription>
          </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
