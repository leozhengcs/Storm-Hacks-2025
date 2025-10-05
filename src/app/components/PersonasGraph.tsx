"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import personas from "@/lib/personas.json";

type NodeData = {
  name: string;
  value?: number;
  image?: string;
  children?: NodeData[];
};

export default function PersonasGraph() {
  const ref = useRef<SVGSVGElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!personas || !Array.isArray(personas)) return;

    const data: NodeData = {
      name: "root",
      children: personas.map((p) => ({
        name: p.details.name,
        value: p.stats.proportion,
        image: p.details.image,
      })),
    };

    const width = 400;
    const height = 400;

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
      .attr("tabindex", 0)
      .attr("role", "img")
      .attr("aria-label", (d) => d.data.name)
      .on("click", (_, d) => {
        router.push(`/personas?active=${encodeURIComponent(d.data.name)}`);
      });

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

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", (d) => Math.min(d.r / 2.5, 14))
      .attr("fill", "white")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,.6)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .text((d) => d.data.name.split(" ")[0]);

    g.on("mouseenter focus", function () {
      d3.select(this).select("text").transition().duration(120).style("opacity", 1);
    }).on("mouseleave blur", function () {
      d3.select(this).select("text").transition().duration(120).style("opacity", 0);
    });
  }, [router]);

  return (
    <div className="flex flex-col border-2 border-cardBorder bg-card w-full h-[92%] rounded-xl drop-shadow-sm">
      <div className="ml-4 mt-2 h-[5vh] font-semibold">
        <b>Meet your customers!</b>
      </div>
      <div className="relative h-[92.5%] w-[97.5%] self-center border-2 border-cardBorder bg-backgroundWhite rounded-xl mb-2 p-4">
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
