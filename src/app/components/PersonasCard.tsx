import { useState } from 'react';

const panels = [
  { title: 'Panel 1', content: 'Content 1' },
  { title: 'Panel 2', content: 'Content 2' },
  { title: 'Panel 3', content: 'Content 3' },
];

export default function HorizontalAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full h-64">
      {panels.map((panel, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={`flex items-center justify-center text-white cursor-pointer transition-all duration-300 overflow-hidden`}
            style={{
              flex: isActive ? 5 : 1, // active panel grows
              backgroundColor: isActive ? '#003049' : '#669BBC',
            }}
            onClick={() => setActiveIndex(isActive ? null : index)}
          >
            <div className="p-4 text-center">
              <h2 className="font-bold">{panel.title}</h2>
              {isActive && <p className="mt-2">{panel.content}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
