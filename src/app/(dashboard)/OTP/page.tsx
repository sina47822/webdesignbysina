import OtpInput from "@/components/Dashboard/OTPInput";
import OtpInputShadcn from "@/components/Dashboard/OtpInputShadcn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">ورود کد دریافتی</h1>
      <OtpInputShadcn />
    </main>
  );
}