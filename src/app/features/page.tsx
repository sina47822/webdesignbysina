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
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <div className='fixed top-0 right-0 w-[20%] h-screen overflow-auto w-[20%] py-5 px-4 rounded-2xl bg-gray-100 h-[100vh]'>
        <a href="/" className='flex items-center gap-6 opacity-50 hover:opacity-100  duration-[0.3s]'>
          <div>
            <img src="/logo.webp" alt="home" className='bg-gray-300 p-3 rounded-md w-13' />
          </div>
          <div>
            <h3 className='font-yekan font-bold'>
              خانه
            </h3>
          </div>
        </a>

        <div className='divider py-5 flex items-center gap-8'>
          <span className='text-sm w-[15%] text-gray-500'>هدر ها</span>
          <span className='flex w-[85%] h-[1px] bg-gray-300'></span>
        </div>

        <section className="space-y-4">
          {menuItems.slice(1).map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item.component);
              }}
              className="flex gap-6 group items-center opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="group-hover:bg-gray-300 p-3 rounded-md w-12 h-12 flex items-center justify-center transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold">{item.title}</h3>
            </a>
          ))}
        </section>
      </div>

      {/* Main Content Area */}
      <div className="w-[80%] mr-auto">
        <Header3 />
        {/* Content */}
        <main className="p-6">{activeComponent && <activeComponent />}</main>
      </div>


    </div>
  )
}

export default page