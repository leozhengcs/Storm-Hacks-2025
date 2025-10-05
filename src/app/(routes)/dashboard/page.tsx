"use client"

import LineChart from "@/app/components/LineGraph"
import PieGraph from "@/app/components/PieGraph"
import PersonasGraph from "@/app/components/PersonasGraph"
import FunnelGraph from "@/app/components/FunnelGraph"

export default function Dashboard() {
  return (
    <div className='flex'>
      <div className="flex flex-col w-full gap-y-2.5 pr-1.25">
        <LineChart></LineChart>
        <div className="flex flex-row gap-2.5">
          <PieGraph></PieGraph>
          <FunnelGraph></FunnelGraph>
        </div>
      </div>
      <div className="flex flex-col w-full pl-1.25">
        <PersonasGraph></PersonasGraph>
      </div>
    </div>

  )
}
