import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { PlusIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';

const items = [
  {
    id: '1',
    title: 'What makes MVPBlocks different?',
    content:
      'MVPBlocks is a fully open-source, developer-first component library built using Next.js and TailwindCSS, designed to help you launch your MVPs in record time. No bloated packages, no unnecessary installs—just clean, copyable code to plug right into your next big thing.',
  },
  {
    id: '2',
    title: 'How can I customize the components?',
    content:
      'All components are built with Tailwind CSS, making them highly customizable. Simply modify the class names or use our theme variables to match your brand. Components also support both light and dark modes out of the box.',
  },
  {
    id: '3',
    title: 'Are MVPBlocks components responsive?',
    content:
      "Absolutely! All components are designed to be fully responsive and work beautifully on all devices, from mobile phones to large desktop screens. We've carefully crafted each component to provide an optimal experience regardless of screen size.",
  },
  {
    id: '4',
    title: 'Can I use MVPBlocks for commercial projects?',
    content:
      'Yes, all MVPBlocks components are free to use for both personal and commercial projects. No attribution required—just build and launch your MVP faster than ever before.',
  },
  {
    id: '5',
    title: 'How do I get started with MVPBlocks?',
    content:
      "Simply browse our component library, find the components you need, and copy the code into your project. It's that easy! Our documentation provides clear instructions for installation and usage.",
  },
];

export default function Faq1() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Frequently Asked{' '}
            <span className="from-primary bg-gradient-to-r to-rose-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p
            className="text-muted-foreground mx-auto max-w-2xl"
          >
            Everything you need to know about MVPBlocks and how to use our
            components to build your next project quickly.
          </p>
        </div>

        <div
          className="relative mx-auto max-w-3xl"
        >
          {/* Decorative gradient */}
          <div className="bg-primary/10 absolute -top-4 -left-4 -z-10 h-72 w-72 rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute -right-4 -bottom-4 -z-10 h-72 w-72 rounded-full blur-3xl" />

          <Accordion
            type="single"
            collapsible
            className="border-border/40 bg-card/30 w-full rounded-xl border p-2 backdrop-blur-sm"
            defaultValue="1"
          >
            {items.map((item, index) => (
              <div
                key={item.id}
              >
                <AccordionItem
                  value={item.id}
                  className={cn(
                    'bg-card/50 my-1 overflow-hidden rounded-lg border-none px-2 shadow-sm transition-all',
                    'data-[state=open]:bg-card/80 data-[state=open]:shadow-md',
                  )}
                >
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger
                      className={cn(
                        'group flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-medium',
                        'hover:text-primary transition-all duration-300 outline-none',
                        'focus-visible:ring-primary/50 focus-visible:ring-2',
                        'data-[state=open]:text-primary',
                      )}
                    >
                      {item.title}
                      <PlusIcon
                        size={18}
                        className={cn(
                          'text-primary/70 shrink-0 transition-transform duration-300 ease-out',
                          'group-data-[state=open]:rotate-45',
                        )}
                        aria-hidden="true"
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent
                    className={cn(
                      'text-muted-foreground overflow-hidden pt-0 pb-4',
                      'data-[state=open]:animate-accordion-down',
                      'data-[state=closed]:animate-accordion-up',
                    )}
                  >
                    <div className="border-border/30 border-t pt-3">
                      {item.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
