"use client";
import { useState, useEffect } from "react";
import PersonasCard from "./PersonasCard";
import { useSearchParams } from "next/navigation";
import personas from "@/lib/personas.json";

export default function HorizontalAccordion() {
  const searchParams = useSearchParams();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  console.log(personas)

  useEffect(() => {
  const activeName = searchParams.get("active");
  if (activeName) {
    const idx = personas.findIndex(
      (p) => p.details.name === activeName
    );
    if (idx !== -1) setActiveIndex(idx);
  }
}, [searchParams]);


  return (
    <div className="flex w-full h-64">
      {personas.map((persona, index) => (
        <PersonasCard
          key={index}
          persona={persona}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index === activeIndex ? null : index)}
        />
      ))}
    </div>
  );
}
