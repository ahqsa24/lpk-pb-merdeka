import React from "react";
import { Card } from "../atoms";
import { Heading } from "../atoms";
import { Paragraph } from "../atoms";
import Image from "next/image"

interface CardWithImageProps {
  img: string;
  title: string;
  text: string;
}
export const CardWithImage: React.FC<CardWithImageProps> = ({ img, title, text }) => (  
  <Card>
    <Image 
        src={img} 
        alt={title} 
        width={300}
        height={200}
        className="w-full rounded-xl mb-3 object-cover" />
    <Heading level={3} className="text-lg">{title}</Heading>
    <Paragraph>{text}</Paragraph>
  </Card>
);