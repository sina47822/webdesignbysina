import "../globals.css";
import Header1 from "@/components/Header/Header1";
import Footer4Col from "@/components/Footer/Footer4Col";
import { ModeToggle } from "@/components/ModeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center">
        <div className="absolute right-20 top-10">
            <ModeToggle />
        </div>
        <button className='absolute text-sm top-10 left-20 py-2 px-6 hover:bg-gray-100 hover:text-gray-900 duration-[.6s] border rounded-2xl dark:border-gray-300'>
          بازگشت به سایت
        </button>
      </div>
      <div className="overflow-x-hidden">
          {children}
      </div>
    </div>
  );
}
