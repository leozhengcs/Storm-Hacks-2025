"use client"

import LineChart from "@/app/components/LineGraph"
import PieGraph from "@/app/components/PieGraph"
import PersonasGraph from "@/app/components/PersonasGraph"
import FunnelGraph from "@/app/components/FunnelGraph"

export default function Dashboard() {
  return (
    <div className='flex gap-x-2.5'>
      <div className="flex flex-col w-full h-[97vh] gap-y-2.5 ">
        <div className="h-[45.7%]">
          <LineChart></LineChart>
        </div>
        <div className="flex flex-row h-[45%] gap-2.5">
          <PieGraph></PieGraph>
          <FunnelGraph></FunnelGraph>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <PersonasGraph></PersonasGraph>
      </div>
    </div>

  )
}
