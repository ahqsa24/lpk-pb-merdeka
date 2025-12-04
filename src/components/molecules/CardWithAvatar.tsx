import { Avatar } from "../atoms"
import { Paragraph } from "../atoms"
import { Heading } from "../atoms"

interface CardWithAvatarProps {
    icon: string;
    title: string;
    description: string;
    className?: string;
}

export const CardWithAvatar: React.FC<CardWithAvatarProps> = ({ icon, title, description, className }) => (
    <div className={`flex flex-row bg-white rounded-2xl p-6 items-center shadow-md **:${className}`}>
        <div className="w-24 h-24 px-4 rounded-full flex items-center justify-center rounded-xl bg-red-600">
            {icon}
        </div>
        <div className="px-4">
            <Heading className="text-xl" level={3}>{title}</Heading>
            <Paragraph className="text-lg">{description}</Paragraph>
        </div>
    </div>
)