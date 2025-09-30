// components/mdx/Callout.tsx
"use client";
import { ReactNode } from "react";

export default function Callout({ children, type = "info" }: { children: ReactNode; type?: "info" | "warning" | "tip" | "danger" | undefined}) {
  const color = type === "info" ? "border-red-500 bg-yellow-500/10" : type === "warning" ? "border-blue-500 bg-emerald-500/10" : type === "tip" ? "border-green-500 bg-emerald-500/10" : type === "danger" ? "border-gray-500 bg-emerald-500/10" : "border-sky-500 bg-sky-500/10";
  return (
    <div className={`rounded-xl border p-4 text-sm leading-7 my-5 ${color}`}>{children}</div>
  );
}