// /lib/menu.ts

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
    //   { 
    //     name: 'آپارات دانلودر',
    //     href: '/services/aparat-dl',
    //     description: 'دانلود از آپارات' },
    ],
  },
  { name: 'بلاگ', href: '/blog' },
  { name: 'نمونه کار', href: '/portfolios' },
  { name: 'ارتباط با ما', href: '/contact' },
];

export default navItems;