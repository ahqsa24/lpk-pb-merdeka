import { Paragraph } from "../atoms";
import { AvatarWithName } from "../molecules";
import { FaQuoteLeft } from "react-icons/fa"; // import icon

interface TestimoniProps {
  src: string;
  comment: string;
  title: string;
  description: string;
}

export const TestimoniBox: React.FC<TestimoniProps> = ({
  src,
  comment,
  title,
  description,
}) => (
  <div className="flex flex-col gap-3 max-w-2xl h-64 p-8  rounded-lg border-2 border-neutral-200">
    <FaQuoteLeft className="text-black text-3xl" />  {/* Quote Icon  */}
    <Paragraph className="italic text-justify text-gray-900">{comment}</Paragraph>

    <AvatarWithName src={src} title={title} description={description} />
  </div>
);
