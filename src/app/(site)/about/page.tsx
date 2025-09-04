import AboutUs1 from '@/components/Pages/About/AboutUs1'
import Team7 from '@/components/Team/ModernMemberTeam'
import ModernMemberTeam from '@/components/Team/ModernMemberTeam'
import Team1 from '@/components/Team/ModernMemberTeam'
import React from 'react'

type SocialMediaLinks = {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  email?: string;
  dribbble?: string;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  email?: string;
  bio?: string;
  image: string;
  backgroundColor?: string; // For colored backgrounds
  socialMedia?: SocialMediaLinks;
  expertise?: string[];
};

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  teamMembers: TeamMember[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  secondaryColor?: string;
  className?: string;
}

const teamMembers3D: TeamMember[] = [
  {
    id: 1,
    name: 'سینا افشار',
    role: 'سرپرست و صاحب کار',
    email: 'sinaa.afshar@gmail.com',
    bio: 'ذوق و شوق طراحی وب باعث شده منی که رشتم یه چیز دیگه بوده عاشق این کار باشم',
    image:
      'https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833554.jpg?ga=GA1.1.1818589012.1736774497&semt=ais_hybrid',
    backgroundColor: '#7f1d1d', // bg-red-900
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      website: '#',
    },
  },
  {
    id: 2,
    name: 'گندم برنو',
    role: 'سرپرست و مدیر مالی',
    email: 'gandom.berno@gmail.com',
    bio: 'تیم ما همیشه توی کارش حرفه ای عمل میکنه و همین باعث شده همه چی شفاف باشه',
    image:
      '/assets/img/team/3d-music-related-scene.jpg',
    backgroundColor: '#b45309', // bg-amber-700
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      website: '#',
    },
  },
  {
    id: 3,
    name: 'مهدی نویدی',
    role: 'برنامه نویس ارشد',
    email: 'navidi.mehdi@gmail.com',
    bio: 'من بک اند پروژه ها رو به عهده دارم و استک من دات نت و اندروید دولوپره',
    image:
      'https://img.freepik.com/premium-photo/png-cartoon-portrait-glasses-white-background_53876-905385.jpg?ga=GA1.1.1818589012.1736774497&semt=ais_hybrid',
    backgroundColor: '#1e3a8a', // bg-blue-900
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      website: '#',
    },
  },
  {
    id: 4,
    name: 'شایان باقری',
    role: 'مشاور و مدیر محصول',
    email: 'shayan.bagheri@gmail.com',
    bio: 'همراهی من اینجا فقط باعث رشد بچه های تیم نیست خودمم از خلاقیت و سخت کوشی بچه ها یاد میگیرم',
    image:
      'https://img.freepik.com/premium-psd/3d-avatar-character_975163-690.jpg?ga=GA1.1.1818589012.1736774497&semt=ais_hybrid',
    backgroundColor: '#7f1d1d', // bg-red-900
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      website: '#',
    },
  },
  {
    id: 5,
    name: 'هانی ادیب آزاد',
    role: 'مشاور پروژه',
    email: 'haniadibazad@gmail.com',
    bio: 'بچه های ما همه پر تلاش و سخت کوشن و این به خاطر محیط شاد و پویای کار ماست',
    image:
      'https://img.freepik.com/free-photo/fun-3d-illustration-american-referee_183364-81231.jpg?ga=GA1.1.1818589012.1736774497&semt=ais_hybrid',
    backgroundColor: '#1e3a8a', // bg-blue-900
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      website: '#',
    },
  },
  {
    id: 6,
    name: 'حمید حیدری',
    role: 'طراح اینترفیس',
    email: 'hamid.heidari@gmail.com',
    bio: 'سعی ما اینه که خلاق و بروز بمونیم',
    image:
      'https://img.freepik.com/premium-psd/lego-character-with-blue-button-his-chest_1217673-223400.jpg?ga=GA1.1.1818589012.1736774497&semt=ais_hybrid',
    backgroundColor: '#b45309', // bg-amber-700
    socialMedia: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      website: '#',
    },
  },
];


const page = () => {
  return (
    <div>
        <AboutUs1 />
        <Team7 
            title="تیم وب دیزاین با سینا" 
            backgroundColor="#000000"
            teamMembers={teamMembers3D} 
          />
    </div>
  )
}

export default page