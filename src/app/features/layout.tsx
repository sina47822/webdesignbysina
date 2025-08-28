'use client'; // این خط برای مشخص کردن اینکه این کامپوننت Client-Side است

import { useEffect } from 'react';
import type { ReactNode } from 'react';

import "../globals.css";
import "./cursor.css";
import Header1 from "@/components/Header/Header1";
import Footer4Col from "@/components/Footer/Footer4Col";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    const link = document.querySelectorAll<HTMLElement>('.hover-this');
    const cursor = document.querySelector<HTMLElement>('.cursor');

    const animateit = function (this: HTMLElement, e: MouseEvent) {
      const hoverAnim = this.querySelector<HTMLElement>('.hover-anim');
      if (!hoverAnim) return;

      const { offsetX: x, offsetY: y } = e;
      const { offsetWidth: width, offsetHeight: height } = this;
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;
      hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
      if (e.type === 'mouseleave') hoverAnim.style.transform = '';
    };

    const editCursor = (e: MouseEvent) => {
      if (!cursor) return;
      const { clientX: x, clientY: y } = e;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    // افزودن event listenerها
    link.forEach((b) => b.addEventListener('mousemove', animateit));
    link.forEach((b) => b.addEventListener('mouseleave', animateit));
    window.addEventListener('mousemove', editCursor);

    document.querySelectorAll<HTMLElement>('a, .cursor-pointer').forEach((el) => {
      el.addEventListener('mousemove', () => {
        cursor?.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        cursor?.classList.remove('cursor-active');
      });
    });

    // پاکسازی event listenerها هنگام unmount
    return () => {
      link.forEach((b) => b.removeEventListener('mousemove', animateit));
      link.forEach((b) => b.removeEventListener('mouseleave', animateit));
      window.removeEventListener('mousemove', editCursor);
      document.querySelectorAll<HTMLElement>('a, .cursor-pointer').forEach((el) => {
        el.removeEventListener('mousemove', () => {
          cursor?.classList.add('cursor-active');
        });
        el.removeEventListener('mouseleave', () => {
          cursor?.classList.remove('cursor-active');
        });
      });
    };
  }, []); // آرایه خالی یعنی این effect فقط یک‌بار اجرا می‌شود
  
  return (
      <div className="overflow-x-hidden">
          <div className="cursor" />

          {children}
          <Footer4Col />
      </div>
  );
}
