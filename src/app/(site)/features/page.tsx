'use client'
import Header3 from '@/components/Header/Header3';
import React, { useState } from 'react';
import { 
  FaHome, FaHeading, FaBars, FaPhone, FaServer, FaQuestion, FaMedal, 
  FaPager, FaUsers, FaComment, FaRocket, FaImage, FaTags, FaChartBar, 
  FaTable, FaFileAlt, FaInfoCircle, FaListUl, FaDollarSign, FaEnvelope, 
  FaFeather, FaSearch, FaTimes 
} from 'react-icons/fa';

// Menu configuration
const sideItems = [
  { title: 'همه قابلیت ها', href: '/features', icon: <FaFeather /> },
  { title: 'هدر', href: '/features/headers', icon: <FaHeading /> },
  { title: 'فوتر', href: '/features/footers', icon: <FaBars /> },
  { title: 'کال‌تو‌اکشن', href: '/features/cta', icon: <FaPhone /> },
  { title: 'دکمه', href: '/features/button', icon: <FaServer /> },
  { title: 'سوالات متداول', href: '/features/faq', icon: <FaQuestion /> },
  { title: 'مدال‌ها', href: '/features/modals', icon: <FaMedal /> },
  { title: 'صفحه‌بندی', href: '/features/paginations', icon: <FaPager /> },
  { title: 'تیم‌ها', href: '/features/teams', icon: <FaUsers /> },
  { title: 'نظرات کاربران', href: '/features/testimonials', icon: <FaComment /> },
  { title: 'هیرو', href: '/features/hero', icon: <FaRocket /> },
  { title: 'نمایش لوگو', href: '/features/logo', icon: <FaImage /> },
  { title: 'محصولات', href: '/features/products', icon: <FaTags /> },
  { title: 'آنالیتیک', href: '/features/analytics', icon: <FaChartBar /> },
  { title: 'داشبورد', href: '/features/dashboard', icon: <FaTable /> },
  { title: 'گزارات‌گیری', href: '/features/reports', icon: <FaFileAlt /> },
  { title: 'درباره ما', href: '/features/about', icon: <FaInfoCircle /> },
  { title: 'قابلیت‌ها', href: '/features/features', icon: <FaListUl /> },
  { title: 'قیمت', href: '/features/pricing', icon: <FaDollarSign /> },
  { title: 'ارتباط با ما', href: '/features/contact', icon: <FaEnvelope /> },
];

const Page = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenuClick = (component: null) => {
    setActiveComponent(() => component);
  };

  const filteredItems = sideItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Header3 />
      <div className="container mx-auto px-4 py-8">
        <section className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-right">
            همه اجزای سایت
          </h1>
          <p className="text-gray-600 dark:text-primary/80 text-right">
            از سایدبار راست یکی از صفحات را انتخاب کنید یا در لیست زیر انتخاب کنید. از دکمه سرچ هم می‌توانید استفاده کنید.
          </p>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-right text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Features Grid */}
          <div className="rounded-xl border p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <a
                  href={item.href}
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-2xl text-primary dark:text-primary-400">{item.icon}</div>
                  <span className="text-gray-900 dark:text-white font-medium text-right">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;