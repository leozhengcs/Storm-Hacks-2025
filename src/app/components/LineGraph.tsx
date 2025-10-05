import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";
import { getRevenueData } from "@/lib/analysis";

type ChartDatum = { name: string; revenue: number };

export default function LineGraph() {
  const [data, setData] = useState<ChartDatum[]>([]);

  useEffect(() => {
    getRevenueData("monthly").then((res) => setData(res));
  }, []);

  return (
    <div className='flex flex-col border-2 border-cardBorder bg-card w-full h-full rounded-xl drop-shadow-sm'>
      <div className='ml-4 mt-2 h-[5vh] text-[#111111]'><b>Revenue</b></div>
      <div className='h-[97.5%] w-[97.5%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 pt-4 pr-4'>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
            <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}/>
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}