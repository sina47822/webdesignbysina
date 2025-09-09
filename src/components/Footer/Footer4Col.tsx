import {
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const data = {
  facebookLink: 'https://facebook.com/webdesignwithsina',
  instaLink: 'https://instagram.com/webdesignwithsina',
  twitterLink: 'https://twitter.com/webdesignwithsina',
  githubLink: 'https://github.com/webdesignwithsina',
  dribbbleLink: 'https://dribbble.com/webdesignwithsina',
  services: {
    webdev: '/web-development',
    webdesign: '/web-design',
    marketing: '/marketing',
    googleads: '/SEO',
    uxdesign: '/UX-UI',
    consulting: '/consulting',

  },
  about: {
    history: '/company-history',
    team: '/meet-the-team',
    handbook: '/employee-handbook',
    careers: '/contact/#careers',
  },
  help: {
    faqs: '/contact/#faqs',
    support: '/services/support',
    livechat: '/contact/#live-chat',
  },
  contact: {
    email: 'info@webdesignbysina.ir',
    phone: '09192001923',
    address: 'تهران میدان ونک بزرگراه شهید حقانی پلاک 40 و 42',
  },
  company: {
    name: 'وب دیزاین با سینا',
    description:
      'ما با تجربه بیش از 10 سال در کسب و کارهای اینترنتی به شما کمک میکنیم تا جایگاهی درخور و برای خودتون در اینترنت داشته باشید و به جای استفاده از واسطه ها مستقیم با مشتری در ارتباط باشید و حلقه مشتریان خودتون رو نشکیل بدید',
    logo: '/logo.webp',
  },
};

const socialLinks = [
  { icon: FaFacebook, label: 'Facebook', href: data.facebookLink },
  { icon: FaInstagram, label: 'Instagram', href: data.instaLink },
  { icon: FaTwitter, label: 'Twitter', href: data.twitterLink },
  { icon: FaGithub, label: 'GitHub', href: data.githubLink },
  { icon: FaDribbble, label: 'Dribbble', href: data.dribbbleLink },
];

const aboutLinks = [
  { text: 'تاریخچه کار ما', href: data.about.history },
  { text: 'مشاهده تیم ما', href: data.about.team },
  { text: 'راهنمای شروع همکاری', href: data.about.handbook },
  { text: 'موقعیت های شغلی باز', href: data.about.careers },
];

const serviceLinks = [
  { text: 'توسعه وب و اپلیکیشن', href: data.services.webdev },
  { text: 'طراحی گرافیکی سایت', href: data.services.webdesign },
  { text: 'بازاریابی دیجیتال', href: data.services.marketing },
  { text: 'SEO', href: data.services.googleads },
  { text: 'مدیریت محصول', href: data.services.uxdesign },
  { text: 'مشاوره کسب و کار', href: data.services.consulting },

];

const helpfulLinks = [
  { text: 'سوالات متداول', href: data.help.faqs },
  { text: 'پشتیبانی', href: data.help.support },
  { text: 'چت آنلاین', href: data.help.livechat, hasIndicator: true },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer4Col() {
  return (
    <footer className="bg-secondary dark:bg-secondary/20 pt-16 w-full place-self-end rounded-t-xl">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-right">
              <p className="text-lg font-medium">درباره ما</p>
              <ul className="mt-8 space-y-4 text-sm">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-secondary-foreground/70 transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-lg font-medium">خدمات ما</p>
              <ul className="mt-8 space-y-4 text-sm">
                {serviceLinks.map(({ text, href }) => (
                  <li key={text}>
                    <a
                      className="text-secondary-foreground/70 transition"
                      href={href}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-lg font-medium">لینک های کاربردی</p>
              <ul className="mt-8 space-y-4 text-sm">
                {helpfulLinks.map(({ text, href, hasIndicator }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className={`${
                        hasIndicator
                          ? 'group flex justify-center gap-1.5 sm:justify-start'
                          : 'text-secondary-foreground/70 transition'
                      }`}
                    >
                      <span className="text-secondary-foreground/70 transition">
                        {text}
                      </span>
                      {hasIndicator && (
                        <span className="relative flex size-2">
                          <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                          <span className="bg-primary relative inline-flex size-2 rounded-full" />
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-lg font-medium">ارتیاط با ما</p>
              <ul className="mt-8 space-y-4 text-sm">
                {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                  <li key={text}>
                    <a
                      className="flex items-center justify-center gap-1.5 sm:justify-start"
                      href="#"
                    >
                      <Icon className="text-primary size-5 shrink-0 shadow-sm" />
                      {isAddress ? (
                        <address className="text-secondary-foreground/70 -mt-0.5 flex-1 not-italic transition">
                          {text}
                        </address>
                      ) : (
                        <span className="text-secondary-foreground/70 flex-1 transition">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="text-primary flex justify-center gap-2 sm:justify-start">
              <img
                src={data.company.logo || '/placeholder.svg'}
                alt="logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-2xl font-semibold">
                {data.company.name}
              </span>
            </div>

            <p className="text-foreground/50 mt-6 max-w-md text-justify leading-relaxed sm:max-w-xs sm:text-justify">
              {data.company.description}
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <Link prefetch={false}                    href={href}
                    className="text-primary hover:text-primary/80 transition"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon className="size-6" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm">
              <span className="block sm:inline">تمامی حقوق محتوای این وبسایت برای ما محفوظ است</span>
            </p>

            <p className="text-secondary-foreground/70 mt-4 text-sm transition sm:order-first sm:mt-0">
              1404 &copy; {data.company.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
