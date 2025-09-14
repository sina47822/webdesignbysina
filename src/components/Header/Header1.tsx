'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import SigninModal from '../Modals/SigninModal';
import { ModeToggle } from '../ModeToggle';
import { FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa';

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { name: 'خانه', href: '/' },
  { name: 'درباره ما', href: '/about' },
  {
    name: 'خدمات',
    href: '/services',
    hasDropdown: true,
    dropdownItems: [
      { 
        name: 'قیمت گذاری',
        href: '/pricing',
        description: 'قیمت گذاری برای طراحی سایت' },
      {
        name: 'سئو',
        href: '/services/SEO',
        description: 'رتبه اول گوگل شوید',
      },
      {
        name: 'پشتیبانی وبسایت',
        href: '/services/supports',
        description: 'با ما بمانید تا رشد کنید',
      },
      {
        name: 'سفارش طراحی المان',
        href: '/services/feature-design',
        description: 'طراحی کامپوننت و المان ها مطابق سلیقه شما',
      },
      { 
        name: 'سایت ساز',
        href: '/webbuilder',
        description: 'همین حالا سایت خود را بسازید' },
      { 
        name: 'دریافت آی پی',
        href: '/services/ip-checker',
        description: 'ip خود را جک کنید' },
      { 
        name: 'آپارات دانلودر',
        href: '/services/aparat-dl',
        description: 'دانلود از آپارات' },
    ],
  },
  { name: 'بلاگ', href: '/blog' },
  { name: 'نمونه کار', href: '/portfolios' },
  { name: 'ارتباط با ما', href: '/contact' },
];

export default function Header1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'border-border/50 bg-background/80 border-b text-foreground shadow-sm backdrop-blur-md'
            : 'bg-transparent'
        }`}
      variants={containerVariants}
      initial="initial"
      animate={isScrolled ? 'scrolled' : 'animate'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        backgroundColor: isScrolled
          ? theme === 'dark'
            ? 'rgba(0, 0, 0, 0.6) text-gray-200'
            : 'rgba(0, 0, 0, 0.6) text-gray-200 text-gray-800 '
          : 'transparent',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Link prefetch={false} href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-300 to-blue-700">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-xl font-bold text-foreground">
                WDWS.
              </span>
            </Link>
          </motion.div>

          <nav className="hidden items-center space-x-8 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                    prefetch={false}
                    href={item.href}
                    className="text-foreground flex items-center space-x-1 font-medium transition-colors duration-200 hover:text-rose-500"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  )}
                </Link>

                {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="border-border bg-background/95 absolute top-full right-0 mt-2 w-64 overflow-hidden rounded-xl border shadow-xl backdrop-blur-lg"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link 
                            prefetch={false}                            
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="hover:bg-muted block px-4 py-3 transition-colors duration-200"
                          >
                            <div className="text-foreground font-medium">
                              {dropdownItem.name}
                            </div>
                            {dropdownItem.description && (
                              <div className="text-muted-foreground text-sm">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

            {/*  داخل بخش اکشن‌های سمت راست (کنار SigninModal و ModeToggle) */}
            <div className="hidden items-center space-x-4 lg:flex">


            {/* دکمهٔ جستجوی سراسری */}
            <Link
              prefetch={false}
              href="/search"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium hover:bg-gray-100"
              aria-label="جستجوی سایت"
            >
              <FaSearch className="opacity-80" />
              <span className="hidden md:inline">جستجو</span>
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                prefetch={false}
                href="/signup"
                className="inline-flex group items-center space-x-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-6 py-2.5 font-medium text-white transition-all duration-200 hover:shadow-lg"
              >
                <span>شروع همکاری</span>
                  <ArrowLeft className="h-4 w-4 duration-[.3s] group-hover:-translate-x-1" />
              </Link>
            </motion.div>
            <ModeToggle />
            <SigninModal />

          </div>

          <motion.button
            className="hover:bg-muted rounded-lg p-2 transition-colors duration-200 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="overflow-hidden lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className={`border-border bg-background/95 mt-4 space-y-2 rounded-xl border py-4 shadow-xl backdrop-blur-lg`
                 
               }>
                {navItems.map((item) => (
                  <Link 
                    prefetch={false}
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:bg-muted block px-4 py-3 font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  prefetch={false}
                  href="/search"
                  className="text-foreground hover:bg-muted bg-background hover:bg-blue-500/40 block px-6 py-3 font-medium transition-colors duration-200 justify-self-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  جستجو
                </Link>
                <div className="space-y-2 px-6 py-2 ">
                  <Link 
                    prefetch={false}
                    href="/signin"
                    className="text-foreground cursor-pointer hover:bg-muted block w-full rounded-2xl py-3 text-center font-medium transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    ورود
                  </Link>
                  <Link 
                    prefetch={false}
                    href="/signup"
                    className="block w-full rounded-lg bg-gradient-to-r from-rose-500 to-rose-700 py-2.5 text-center font-medium text-white transition-all duration-200 hover:shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    شروع همکاری
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
