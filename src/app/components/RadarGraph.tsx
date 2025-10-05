import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type RadarGraphProps = {
  data: { category: string; stat: number }[];
};

export default function RadarGraph({ data }: RadarGraphProps) {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="45%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          {/* <PolarRadiusAxis angle={30} domain={[0, 100]} /> */}
          <Radar legendType="none" dataKey="stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
};

