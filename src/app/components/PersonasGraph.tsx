"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import personas from "@/lib/personas.json";

type NodeData = {
  name: string;
  value?: number;
  children?: NodeData[];
};

export default function PersonasGraph() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!personas || !Array.isArray(personas)) return;

    // Transform personas into a hierarchical dataset for d3.pack
    const data: NodeData = {
      name: "root",
      children: personas.map(p => ({
        name: p.details.name,
        value: p.stats.proportion, // bubble size
      })),
    };

    const width = 400;
    const height = 400;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const root = d3
      .hierarchy<NodeData>(data)
      .sum(d => d.value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const pack = d3.pack<NodeData>().size([width, height]).padding(8);
    const packedRoot = pack(root);
    const nodes = packedRoot.children ?? [];

    // color scale for differentiation
    const color = d3.scaleOrdinal(d3.schemeTableau10);

    // Draw circles
    svg
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("fill", (_, i) => color(String(i)))
      .attr("stroke", "#222")
      .attr("stroke-width", 1.5)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value?.toFixed(1)}%`);

    // Add text labels
    svg
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", d => Math.min(d.r / 2.5, 14))
      .attr("fill", "white")
      .text(d => d.data.name.split(" ")[0]); // show first name only for space
  }, []);

  return (
    <div className="flex flex-col border-2 border-cardBorder bg-card w-full h-[92%] rounded-xl drop-shadow-sm">
      <div className="ml-4 mt-2 h-[5vh] font-semibold">Meet your customers!</div>
      <div className="h-[95%] w-[95%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 pt-4 pr-4">
        <svg
          ref={ref}
          viewBox="0 0 400 400"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
}
