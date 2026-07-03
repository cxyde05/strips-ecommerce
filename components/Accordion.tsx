'use client';

import { useState } from 'react';

interface AccordionProps {
  items: Array<{
    title: string;
    content: string;
  }>;
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0 border-t border-luxury-silver/20">
      {items.map((item, index) => (
        <div key={index} className="border-b border-luxury-silver/20">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full py-4 flex justify-between items-center hover:text-luxury-silver transition-colors"
          >
            <h4 className="font-display text-lg text-left">{item.title}</h4>
            <span className="text-2xl">{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && (
            <div className="pb-4 pr-4 text-luxury-silver text-sm leading-relaxed animate-fade-in">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
