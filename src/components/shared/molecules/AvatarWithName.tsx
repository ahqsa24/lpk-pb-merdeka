import React from "react";
import { Avatar } from "../atoms";
import { Paragraph } from "../atoms";

interface AvatarWithNameProps {
  src: string;
  title: string;
  description: string;
  className?: string;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({ src, title, description }) => (
  <div className="flex flex-row gap-2">
    <Avatar src={src} size={56} className="items-center"/>
    <div className="flex flex-col">
      <Paragraph className="font-bold text-xl">{title}</Paragraph>
      <Paragraph variant="black" className="text-zinc-800/80 font-medium text-lg ">{description}</Paragraph>
    </div>
  </div>
);