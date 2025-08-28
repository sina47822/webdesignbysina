'use client'
import Header3 from '@/components/Header/Header3';
import React, { useState } from 'react'
import { FaHome, FaHeading, FaBars, FaPhone, FaQuestion, FaMedal, FaPager, FaUsers, FaComment, FaRocket, FaImage, FaServer } from 'react-icons/fa';
// Menu configuration JSON
const menuItems = [
  {
    id: 'home',
    title: 'خانه',
    icon: <FaHome />,
    path: '/',
    component: () => <div className="p-6">صفحه اصلی</div>
  },
  {
    id: 'headers',
    title: 'هدر',
    icon: <FaHeading />,
    path: '/headers',
    component: Headers
  },
  {
    id: 'footer',
    title: 'فوتر',
    icon: <FaBars />,
    path: '/footer',
    component: () => <div className="p-6">بخش فوتر</div>
  },
  {
    id: 'cta',
    title: 'کال تو اکشن',
    icon: <FaPhone />,
    path: '/cta',
    component: () => <div className="p-6">بخش کال تو اکشن</div>
  },
  {
    id: 'button',
    title: 'دکمه',
    icon: <FaServer />,
    path: '/button',
    component: () => <div className="p-6">بخش دکمه‌ها</div>
  },
  {
    id: 'faq',
    title: 'سوالات متداول',
    icon: <FaQuestion />,
    path: '/faq',
    component: () => <div className="p-6">بخش سوالات متداول</div>
  },
  {
    id: 'medals',
    title: 'مدال‌ها',
    icon: <FaMedal />,
    path: '/medals',
    component: () => <div className="p-6">بخش مدال‌ها</div>
  },
  {
    id: 'pagination',
    title: 'صفحه‌بندی',
    icon: <FaPager />,
    path: '/pagination',
    component: () => <div className="p-6">بخش صفحه‌بندی</div>
  },
  {
    id: 'teams',
    title: 'تیم‌ها',
    icon: <FaUsers />,
    path: '/teams',
    component: () => <div className="p-6">بخش تیم‌ها</div>
  },
  {
    id: 'testimonials',
    title: 'نظرات کاربران',
    icon: <FaComment />,
    path: '/testimonials',
    component: () => <div className="p-6">بخش نظرات کاربران</div>
  },
  {
    id: 'hero',
    title: 'هیرو',
    icon: <FaRocket />,
    path: '/hero',
    component: () => <div className="p-6">بخش هیرو</div>
  },
  {
    id: 'logo',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  },
  {
    id: 'logo1',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  },
  {
    id: 'logo2',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  },
  {
    id: 'logo3',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  },
  {
    id: 'logo4',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  },
  {
    id: 'log5o',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  },
  {
    id: 'logo6',
    title: 'نمایش لوگو',
    icon: <FaImage />,
    path: '/logo',
    component: () => <div className="p-6">بخش نمایش لوگو</div>
  }
];

const page = () => {
  const [activeComponent, setActiveComponent] = useState();

  const handleMenuClick = (component: any) => {
    setActiveComponent(() => component);
  };

  return (
    <div>
      <section className="space-y-4">
        <h1 className="text-2xl font-bold">دمو: هدر فیکس + صفحات جدا</h1>
        <p className="text-gray-600">از سایدبار راست یکی از صفحات را انتخاب کنید.</p>
        <div className="h-[1200px] rounded-xl bg-white border p-6">
        این باکس بلند است تا اسکرول بخورد و رفتار هدر فیکس را ببینید.
        </div>
      </section>
    </div>
  )
}

export default page