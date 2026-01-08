import { Paragraph } from "../atoms"
import { Heading } from "../atoms"

interface CardWithAvatarProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

export const CardWithAvatar: React.FC<CardWithAvatarProps> = ({ icon, title, description, className }) => (
    <div className={`flex flex-row bg-white rounded-2xl p-6 items-center border-2 border-neutral-200 **:${className}`}>
        <div className="w-20 h-20 px-4 flex items-center justify-center rounded-full object-cover bg-red-600">
            {icon}
        </div>
        <div className="px-4 text-justify">
            <Heading className="text-xl" level={3}>{title}</Heading>
            <Paragraph className="text-lg">{description}</Paragraph>
        </div>
    </div>
)