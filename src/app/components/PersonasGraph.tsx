"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import personas from "@/lib/personas.json";

type NodeData = {
  name: string;
  value?: number;
  image?: string;
  children?: NodeData[];
};

export default function PersonasGraph() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!personas || !Array.isArray(personas)) return;

    // Transform personas into a hierarchical dataset for d3.pack
    const data: NodeData = {
      name: "root",
      children: personas.map((p) => ({
        name: p.details.name,
        value: p.stats.proportion, // bubble size\
        image: p.details.image,
      })),
    };

    const width = 400;
    const height = 400;

    // const svg = d3.select(ref.current);
    // svg.selectAll("*").remove();

    const root = d3
      .hierarchy<NodeData>(data)
      .sum((d) => d.value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const pack = d3.pack<NodeData>().size([width, height]).padding(8);
    const packedRoot = pack(root);
    const nodes = packedRoot.children ?? [];
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const g = svg
      .selectAll<SVGGElement, (typeof nodes)[0]>("g.node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .attr("tabindex", 0) // keyboard focusable for a11y
      .attr("role", "img")
      .attr("aria-label", (d) => d.data.name);

    // clip each image to a circle
    g.append("clipPath")
      .attr("id", (_, i) => `clip-${i}`)
      .append("circle")
      .attr("r", (d) => d.r);

    g.append("image")
      .attr("href", (d) => d.data.image!)
      .attr("x", (d) => -d.r)
      .attr("y", (d) => -d.r)
      .attr("width", (d) => d.r * 2)
      .attr("height", (d) => d.r * 2)
      .attr("clip-path", (_, i) => `url(#clip-${i})`);

    // label (hidden until hover/focus)
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", (d) => Math.min(d.r / 2.5, 14))
      .attr("fill", "white")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,.6)")
      .style("pointer-events", "none") // label itself shouldn't capture hover
      .style("opacity", 0)
      .text((d) => d.data.name.split(" ")[0]);

    // show/hide on hover or keyboard focus
    g.on("mouseenter focus", function () {
      d3.select(this)
        .select("text")
        .transition()
        .duration(120)
        .style("opacity", 1);
    }).on("mouseleave blur", function () {
      d3.select(this)
        .select("text")
        .transition()
        .duration(120)
        .style("opacity", 0);
    });
  }, []);

  return (
    <div className="flex flex-col border-2 border-cardBorder bg-card w-full h-[92%] rounded-xl drop-shadow-sm">
      <div className="ml-4 mt-2 h-[5vh] font-semibold">
        Meet your customers!
      </div>
      <div className="relative h-[95%] w-[95%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 pt-4 pr-4">
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
