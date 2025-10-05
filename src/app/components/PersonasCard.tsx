import RadarGraph from "@/app/components/RadarGraph"


type PersonasCardProps = {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
};

export default function PersonasCard({
  title,
  content,
  isActive,
  onClick,
}: PersonasCardProps) {
  return (
    <div
      onClick={onClick}
      className={`mx-1 flex items-center justify-center text-white cursor-pointer transition-all duration-300 overflow-hidden h-[75vh]
        ${isActive ?
          'flex-[6] bg-[#003049]' :
          'flex-[1] bg-[#669BBC]'}
      `}
    >
      <div className="flex flex-col items-center w-full h-full p-4 text-center">
        <h2 className="font-bold">{title}</h2>
        {isActive && (
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <p className="text-sm  max-w-xs">{content}</p>
            <div className="w-48 h-48 flex items-center justify-center">
              <RadarGraph />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
