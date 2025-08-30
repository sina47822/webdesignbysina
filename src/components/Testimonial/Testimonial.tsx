'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import CTA2 from '../CTA/CTA2';
import Image from 'next/image'; // Importing Image from next/image

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'bg-blue-500/10 p-1 py-0.5 font-bold text-blue-500',
        className,
      )}
    >
      {children}
    </span>
  );
}

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  // Replacing `any` with Record<string, unknown> for better type safety
  [key: string]: unknown;
}

export function TestimonialCard({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4',
        // theme styles
        'border-border bg-card/50 border shadow-sm',
        // hover effect
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground text-sm font-normal select-none">
        {description}
        <div className="flex flex-row py-1">
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
          <Star className="size-4 fill-blue-500 text-blue-500" />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-5 select-none">
        {/* Replace <img> with Next.js <Image /> component */}
        {img && (
          <Image
            src={img}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded-full ring-1 ring-blue-500/20 ring-offset-2"
          />
        )}

        <div>
          <p className="text-foreground font-medium">{name}</p>
          <p className="text-muted-foreground text-xs font-normal">{role}</p>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: 'Jordan Hayes',
    role: 'CTO at Quantum Innovations',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    description: (
      <p>
        NexaUI has completely transformed our development workflow.
        <Highlight>
          The component system saved us weeks of custom coding and design work.
        </Highlight>{' '}
        Our team can now focus on business logic instead of UI details.
      </p>
    ),
  },
  {
    name: 'Maya Rodriguez',
    role: 'Lead Developer at Skyline Digital',
    img: 'https://randomuser.me/api/portraits/women/33.jpg',
    description: (
      <p>
        I was skeptical at first, but NexaUI proved me wrong.
        <Highlight>
          The accessibility features and responsive design are top-notch.
        </Highlight>{' '}
        It&apos;s rare to find a framework that prioritizes both aesthetics and
        functionality.
      </p>
    ),
  },
  // More testimonials...
];

export default function Testimonials() {
  return (
    <section className="relative container py-10 flex flex-col items-center ">
      {/* Decorative elements */}
      <div className="absolute top-20 -left-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 z-10 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-foreground mb-4 text-center text-4xl leading-[1.2] font-bold tracking-tighter md:text-5xl">
          مشتریان ما درباره ما چه گفته اند
        </h2>
        <h3 className="text-muted-foreground mx-auto mb-8 max-w-lg text-center text-lg font-medium tracking-tight text-balance">
           فقط به حرف ما اعتماد نکنید ببینید {' '}
          <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
            مشتریان ما
          </span>{' '}
           درباره {' '}
          <span className="font-semibold text-blue-500"> وب دیزاین با سینا </span>
          چه می گویند
        </h3>
      </motion.div>
      <div className="relative mb-16 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  '[--duration:60s]': i === 1,
                  '[--duration:30s]': i === 2,
                  '[--duration:70s]': i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-20%"></div>
        <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-20%"></div>
      </div>
      {/* <LogoCloud /> */}
      <CTA2 /> 
    </section>
  );
}
