import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

export default function FunnelGraph() {
  const data = [
    {
      "value": 100,
      "name": "Display",
      "fill": "#8884d8"
    },
    {
      "value": 80,
      "name": "Click",
      "fill": "#83a6ed"
    },
    {
      "value": 50,
      "name": "Visit",
      "fill": "#8dd1e1"
    },
    {
      "value": 40,
      "name": "Enquiry",
      "fill": "#82ca9d"
    },
    {
      "value": 26,
      "name": "Order",
      "fill": "#a4de6c"
    }
  ]

  return (
    <div className='border-4 border-orange-500 w-1/2 rounded-xl bg-white'>
      <ResponsiveContainer width='100%' height='100%'>
        <FunnelChart width={730} height={250}>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
          >
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  )
}