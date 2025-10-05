"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

type NodeData = {
  name: string;
  value?: number;
  children?: NodeData[];
};

export default function PersonasGraph() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const data: NodeData = {
      name: "root",
      children: [
        { name: "A", value: 10 },
        { name: "B", value: 15 },
        { name: "A", value: 10 },
        { name: "B", value: 15 },
        { name: "C", value: 20 },
        { name: "D", value: 25 },
        { name: "E", value: 30 },
      ],
    };

    const width = 400;
    const height = 400;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const root = d3
      .hierarchy<NodeData>(data)
      .sum(d => d.value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const pack = d3.pack<NodeData>().size([width, height]).padding(10);
    const packedRoot = pack(root);
    const nodes = packedRoot.children ?? [];

    svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", "#69b3a2")
      .attr("stroke", "#333");

    svg
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "12px")
      .text(d => d.data.name);
  }, []);

  return (
    <div className='flex flex-col border-2 border-cardBorder bg-card w-full h-[92%] rounded-xl drop-shadow-sm'>
      <div className='ml-4 mt-2 h-[5vh]'>Meet your customers!</div>
      <div className='h-[95%] w-[95%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 pt-4 pr-4'>
        <svg
          ref={ref}
          viewBox="0 0 400 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        ></svg>
      </div>
    </div>
  );
}
