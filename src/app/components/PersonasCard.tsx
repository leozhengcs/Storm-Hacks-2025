import RadarGraph from "@/app/components/RadarGraph"
import p1 from "@/static/p1.png"
import Image, { StaticImageData } from "next/image";
import { getMaxStats } from "@/lib/analysis"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Persona = {
  details: {
    name: string;
    ageRange: string;
    country: string;
    sex: string;
    language: string;
    trafficSource: string;
    deviceType: string;
    productType: string;
    bio: string;
  };
  stats: {
    averageSession: number;
    conversionType: string;
    pagesVisited: number;
    averageCartValue: number;
    bounce: number;
    proportion: number;
  };
};


type PersonasCardProps = {
  isActive: boolean;
  persona: Persona;
  onClick: () => void;
};




export default function PersonasCard({
  isActive,
  persona,
  onClick,
}: PersonasCardProps) {

  const [maxData, setMaxData] = useState<{ averageSession: number; pagesVisited: number; averageCartValue: number }>();

  useEffect(() => {
    getMaxStats().then(setMaxData);
  }, []);

  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive) {
      // Delay graph mount after card transition (300–500 ms)
      timer = setTimeout(() => setShowGraph(true), 400);
    } else {
      setShowGraph(false);
    }

    return () => clearTimeout(timer);
  }, [isActive]);

  function getConversionValue(action: string): number {
    switch (action.trim().toLowerCase()) {
      case "viewed product":
        return 20;
      case "added to cart":
        return 40;
      case "abandoned cart":
        return 60;
      case "initiated checkout":
        return 80;
      case "purchased":
        return 100;
      default:
        return 0;
    }
  }

  const graphData = [
    { category: "Session Length", stat: persona?.stats.averageSession / (maxData?.averageSession ?? 1) * 100 },
    { category: "Conversion Type", stat: getConversionValue(persona?.stats.conversionType) },
    { category: "Pages Visited", stat: persona?.stats.pagesVisited / (maxData?.pagesVisited ?? 1) * 100 },
    { category: "Cart Value", stat: persona?.stats.averageCartValue / (maxData?.averageCartValue ?? 1) * 100 },
    { category: "Bounce", stat: persona?.stats.bounce },
    { category: "Proportion", stat: persona?.stats.proportion },
  ];

  return (
    <div
      onClick={onClick}
      className={`mx-1 flex items-center justify-center text-white cursor-pointer transition-all duration-300 overflow-hidden h-[75vh]
        ${isActive ?
          'flex-[10] bg-[#003049]' :
          'flex-[1] bg-[#669BBC]'}
      `}
    >
      {!isActive && (
        <div className="w-[95%] h-full relative overflow-hidden"><Image className=" object-right object-cover" fill src={p1} alt="" /></div>
      )}
      {isActive && (
        <motion.div
          key={persona.details.name}
          initial={{ x: 100, opacity: 0 }}      // starts slightly right
          animate={{ x: 0, opacity: 1 }}         // slides in to center
          // exit={{ x: -100, opacity: 0 }}         // slides out left
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col items-center w-full h-full p-4 text-center"
        >

          <div className='flex gap-x-2.5'>
            <div className="flex flex-col w-full h-[97%] gap-y-2.5 ">
              <div className="h-[45.7%]">
                <Image src={p1} alt="" />
              </div>
              <div className="flex flex-col items-start h-[30%] gap-2.5 p-5">
                <div>Age: {persona?.details?.ageRange}</div>
                <div>Country: {persona?.details?.country}</div>
                <div>Gender: {persona?.details?.sex}</div>
                <div>Device Type: {persona?.details?.deviceType}</div>
                <div>Traffic Source: {persona?.details?.trafficSource}</div>

              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="h-[10%] text-4xl">
                {persona?.details?.name}
              </div>
              <div className="h-[55%] justify-end">{showGraph && (<RadarGraph data={graphData}></RadarGraph>)}</div>
            </div>
          </div>
        </motion.div>

      )}
    </div>
  );
}
