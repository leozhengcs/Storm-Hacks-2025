"use client"

import { Suspense } from "react";
import HorizontalAccordion from "@/app/components/HorizontalAccordion"

export default function Home() {
  return (
    <div className='flex'>
      <Suspense fallback={<div>Loading...</div>}>
        <HorizontalAccordion />
      </Suspense>
    </div>

  )
}