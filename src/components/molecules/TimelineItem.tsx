import { Paragraph } from "../atoms";

interface TimelineItemProps {
  number: string;
  title: string;
  description: string;
  list: string[];
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  number,
  title,
  description,
  list
}) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 w-full gap-6 items-start">
      
      {/* Left Column (Title + Description) */}
      <div className="flex flex-col gap-3 text-right pr-6">
        <Paragraph className="text-xl font-semibold">{title}</Paragraph>
        <Paragraph>{description}</Paragraph>
      </div>

      {/* Center Number */}
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white font-bold text-xl z-10">
          {number}
        </div>
      </div>

      {/* Right Column (List) */}
      <div className="flex flex-col pl-6">
        <ul className="list-disc pl-6 text-gray-700">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
