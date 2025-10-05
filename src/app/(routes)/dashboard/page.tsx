"use client"

import LineChart from "@/app/components/LineGraph"
import PieGraph from "@/app/components/PieGraph"
import PersonasGraph from "@/app/components/PersonasGraph"
import FunnelGraph from "@/app/components/FunnelGraph"

export default function Dashboard() {
  return (
    <div className='flex'>
      <div className="flex flex-col w-full gap-y-5 pr-2.5">
        <LineChart></LineChart>
        <div className="flex flex-row gap-5">
          <PieGraph></PieGraph>
          <FunnelGraph></FunnelGraph>
        </div>
      </div>
      <div className="flex flex-col w-full pl-2.5">
        <PersonasGraph></PersonasGraph>
      </div>
    </div>

  )
}
