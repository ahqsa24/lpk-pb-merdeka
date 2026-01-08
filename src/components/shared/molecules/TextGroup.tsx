import { Heading } from "../atoms";
import { Paragraph } from "../atoms";

interface TextGroupProps {
  heading: string;
  title: string;
  text: string;
  className?: string;
}

export const TextGroup : React.FC<TextGroupProps> = ({ heading, text, title, className }) => {
  return (
    <div className={className}>
        <Paragraph className="text-lg font-bold">{title}</Paragraph>
        <Heading level={3} className="text-4xl mb-2">{heading}</Heading>
        <Paragraph className="text-lg">{text}</Paragraph>
    </div>
  );
};