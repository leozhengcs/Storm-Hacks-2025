import { useState } from 'react';
import PersonasCard from './PersonasCard';

const panels = [
  { title: 'Panel 1', content: 'Content 1' },
  { title: 'Panel 2', content: 'Content 2' },
  { title: 'Panel 3', content: 'Content 3' },
  { title: 'Panel 4', content: 'Content 4' },
  { title: 'Panel 5', content: 'Content 5' },
];

export default function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full h-64">
      {panels.map((panel, index) => (
        <PersonasCard
          key={index}
          title={panel.title}
          content={panel.content}
          isActive={index === activeIndex}
          onClick={() =>
            setActiveIndex(index === activeIndex ? null : index)
          }
        />
      ))}
    </div>
  );
}
