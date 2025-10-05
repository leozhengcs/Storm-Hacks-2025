import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { getFunnelData } from "@/lib/analysis";

export default function FunnelGraph() {
  const [data, setData] = useState<{ name: string; value: number; fill: string }[]>([]);

  useEffect(() => {
    getFunnelData().then(setData);
  }, []);

  return (
    <div className='flex flex-col border-2 border-cardBorder bg-card w-full h-full rounded-xl drop-shadow-sm'>
      <div className='ml-4 mt-2 h-[5vh]'><b>Conversion</b></div>
      <div className='h-[95%] w-[95%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 pt-4 pr-4'>
        <ResponsiveContainer width='100%' height='100%'>
          <FunnelChart width={730} height={250}>
            <Tooltip />
            <Funnel
              dataKey="value"
              data={data}
              cx="30%"
              cy="50%"
              isAnimationActive
            >
              <LabelList position="inside" fill="#000" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}