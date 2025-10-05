import { useState } from 'react';
import PersonasCard from './PersonasCard';

import personas from "@/lib/personas.json"


export default function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full h-64">
      {personas.map((persona, index) => (
        <PersonasCard
          key={index}
          persona={persona}
          isActive={index === activeIndex}
          onClick={() =>
            setActiveIndex(index === activeIndex ? null : index)
          }
        />
      ))}
    </div>
  );
}
