import { Pie, PieChart, ResponsiveContainer, Cell, Sector, SectorProps } from 'recharts';
import { useState } from 'react';

const data = [
  { name: 'Group A', value: 400, description: "hello testing 1" },
  { name: 'Group B', value: 300, description: "hello testing 2" },
  { name: 'Group C', value: 300, description: "hello testing 3" },
  { name: 'Group D', value: 200, description: "hello testing 4" },
];

type Coordinate = {
  x: number;
  y: number;
};



const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  if (!cx || !cy || !outerRadius) return <g />;

  return (
    <g>
      {/* The slice itself */}
      <Sector
        cx={cx}
        cy={cy}
        color={"red"}
        innerRadius={innerRadius}
        outerRadius={outerRadius} // slightly pop out
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#FF8042"
      />

      {/* Simple "textbox" with details */}
      <foreignObject
        x={cx! + outerRadius + 10} // roughly center the box
        y={cy! - outerRadius} // place above the slice
        width={100}
        height={200}
      >
        <div
          // xmlns="http://www.w3.org/1999/xhtml"
          style={{
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            borderRadius: 6,
            padding: 4,
            fontSize: 12,
            boxShadow: '0 0 4px rgba(0,0,0,0.3)',
          }}
        >
          {payload.description}
        </div>
      </foreignObject>
    </g>
  );
};

export default function PieGraph() {
  return (
    <div className='flex flex-col border-2 border-cardBorder bg-card w-full h-full rounded-xl drop-shadow-sm'>
      <div className='ml-4 mt-2 h-[5vh]'>Traffic Sources</div>
      <div className='h-[95%] w-[95%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 pt-4 pr-4'>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              activeShape={renderActiveShape}
              data={data}
              cx="35%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
