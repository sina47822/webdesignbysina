import { Send } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function CTA2() {
  return (
    <div className="z-1">
      <div className="relative flex justify-center items-center w-full max-w-4xl overflow-hidden rounded-2xl bg-orange-500 p-6 sm:p-10 md:p-20">
        <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
          <div className="absolute top-1/2 right-[-45%] aspect-square h-[800px] w-[800px] -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-orange-400 opacity-30"></div>
            <div className="absolute inset-0 scale-[0.6] rounded-full bg-orange-300 opacity-30"></div>
            <div className="absolute inset-0 scale-[0.4] rounded-full bg-orange-200 opacity-30"></div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="mb-3 text-xl font-yekan font-bold text-white sm:text-2xl md:mb-4 md:text-3xl">
            به گروه تلگرامی ما بپیوندید
          </h1>
          <p className="mb-6 max-w-lg text-sm mt-6 text-white sm:text-md md:mb-8 text-justify">
            در اینجا پر از آموزش های روز و نحوه کار ما را مشاهده میکنید همینطور همینطور می توانید ارتباط نزدیک تری با ما داشته باشید
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button className="flex w-full group items-center justify-between rounded-full bg-blue-950 px-5 py-3 text-white sm:w-[240px]">
              <Send />
              <span className="text-md font-yekan font-bold">تلگرام</span>
              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-white group-hover:bg-red-300 duration-[.2s]"></span>
            </button>
            <button className="flex w-full group items-center justify-between rounded-full bg-blue-950 px-5 py-3 text-white sm:w-[240px]">
              <FaInstagram />
              <span className="text-md font-yekan font-bold">اینستاگرام</span>
              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-white group-hover:bg-blue-600 duration-[.2s]"></span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
