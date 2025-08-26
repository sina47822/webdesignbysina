"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";

const OtpInput: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{0,6}$/.test(pasteData)) {
      const newOtp = pasteData.split("").concat(Array(6 - pasteData.length).fill(""));
      setOtp(newOtp);
      const lastFilledIndex = pasteData.length - 1;
      if (lastFilledIndex < 5) {
        const nextInput = document.getElementById(`otp-${lastFilledIndex + 1}`);
        nextInput?.focus();
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const fullOtp = otp.join("");

  const handleConfirm = () => {
    if (isOtpComplete) {
      console.log("OTP Confirmed:", fullOtp);
      // اینجا می‌تونی API کال یا هندلر دیگه اضافه کنی
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-center space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={index === 0 ? handlePaste : undefined}
            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
          />
        ))}
      </div>
      <button
        onClick={handleConfirm}
        disabled={!isOtpComplete}
        className={`px-4 py-2 text-white font-semibold rounded-md transition-colors ${
          isOtpComplete ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        تایید
      </button>
    </div>
  );
};

export default OtpInput;