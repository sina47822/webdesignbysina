import React, { useEffect, useRef } from 'react';
import { AuroraBackground } from '@/components/ui/shadcn-io/aurora-background';
import { StarIcon } from 'lucide-react';
import { gsap } from 'gsap';

const MainHomePage: React.FC = () => {
  const starRef1 = useRef<HTMLSpanElement>(null);
  const starRef2 = useRef<HTMLSpanElement>(null);
  const starRef3 = useRef<HTMLSpanElement>(null);
  const starRef4 = useRef<HTMLSpanElement>(null);
  const animationContext = useRef<gsap.core.Animation[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const stars = [starRef1.current, starRef2.current,starRef3.current,starRef4.current].filter(Boolean) as HTMLSpanElement[];

      // Clear previous animations
      animationContext.current.forEach((anim) => anim.kill());
      animationContext.current = [];

      // Animate each star
      stars.forEach((star) => {
        const anim = gsap.fromTo(
          star,
          {
            y: -100, // Start 100px above
            opacity: 0, // Start invisible
            rotation: 0, // Start with no rotation
            scale: 2,
          },
          {
            y: 0, // Move to original position
            opacity: 1, // Fade in
            duration: 0.8, // Animation duration
            ease: 'bounce.out',// Bounce easing
            onComplete: () => {
              gsap.to(star, {
                rotation: 360, // Rotate 360 degrees
                duration: 2, // Rotation duration
                ease: 'linear', // Smooth rotation
              });
            },
          }
        );
        animationContext.current.push(anim);
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      animationContext.current.forEach((anim) => anim.kill());
    };
  }, []);

  return (
    <AuroraBackground>
      <div className="relative flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          <span ref={starRef1}>
            <StarIcon className="text-yellow-100 duration-[.2s] hover:scale-[1.2] duration-2 hover:text-yellow-500 cursor-pointer inline-block" />
          </span>
          <span className="px-3">Web Design By Sina</span>
          <span ref={starRef2}>
            <StarIcon className="text-yellow-100 hover:scale-[1.2] hover:text-yellow-500 cursor-pointer inline-block" />
          </span>
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          <span ref={starRef3}>
            <StarIcon className="text-yellow-100 hover:scale-[1.2] hover:text-yellow-500 cursor-pointer inline-block" />
          </span>
          <span className='px-3'>And this, is chemical burn.</span>
          <span ref={starRef4}>
            <StarIcon className="text-yellow-100 hover:scale-[1.2] hover:text-yellow-500 cursor-pointer inline-block" />
          </span>
        </div>
        <button className="bg-black hover:scale-[1.2] duration-[.2s] dark:bg-white dark:hover:bg-gray-900 dark:hover:text-yellow-200 rounded-full w-fit text-white dark:text-black text-xl px-8 py-4">
          Pricing List
        </button>
      </div>
    </AuroraBackground>
  );
};

export default MainHomePage;