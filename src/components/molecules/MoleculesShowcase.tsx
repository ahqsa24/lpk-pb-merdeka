import { AvatarWithName } from "./AvatarWithName";
import { CardWithImage } from "./CardWithImage";
import { FormField } from "./FormField";
import { StatBox } from "./StatBox";
import { Heading } from "../atoms/Heading";
import { LineHeading } from "./LineHeading";
import { TextGroup } from "./TextGroup";
import { CardWithAvatar } from "./CardWithAvatar"
import { BookOpen} from "lucide-react";

export const MoleculesShowcase = () => (
  <div className="w-full space-y-8">
    <Heading level={2} className="text-3xl font-bold">Molecules</Heading>

    {/* CardWithAvatar Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Card With Avatar</Heading>
      <div className="flex gap-8 flex-wrap">
        <CardWithAvatar 
          icon={<BookOpen size={48} className="text-white"/>}
          title="Judul Card With Avatar" 
          className="object-contain"
          description="Ini adalah contoh CardWithAvatar component yang menampilkan avatar, judul, dan deskripsi."
        />
      </div>
    </div>

    {/* LineHeading Section */}
    <div className="border rou   nded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Line Heading</Heading>
      <div className="flex gap-8 flex-wrap">
        <LineHeading title="Molekul dengan Garis" lineClassName="w-16 h-1 bg-red-600" />
      </div>
    </div>

     {/* TextGroup Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">Text Group</Heading>
      <div className="flex gap-8 flex-wrap">
        <TextGroup 
            title="Sample Title"
            heading="Sample Heading" 
            text="This is a sample text for the text group component." />
      </div>
    </div>


    {/* AvatarWithName Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">AvatarWithName</Heading>
      <div className="flex gap-8 flex-wrap">
        <AvatarWithName
          src="/assets/Logo-Tab.png"
          title="John Doe"
          description="Software Engineer"
        />
        <AvatarWithName
          src="https://via.placeholder.com/56"
          title="Jane Smith"
          description="UI/UX Designer"
        />
      </div>
    </div>

    {/* CardWithImage Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">CardWithImage</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardWithImage
          img="https://via.placeholder.com/300x200"
          title="Sample Card"
          text="This is a card with an image component"
        />
        <CardWithImage
          img="https://via.placeholder.com/300x200"
          title="Another Card"
          text="You can use this for product listings or feature highlights"
        />
      </div>
    </div>

    {/* FormField Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">FormField</Heading>
      <div className="max-w-md">
        <FormField
          label="Username"
          id="username"
          placeholder="Enter your username"
        />
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
        />
        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
    </div>

    {/* StatBox Section */}
    <div className="border rounded-lg p-6 bg-slate-50">
      <Heading level={3} className="text-xl mb-4">StatBox</Heading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox number="1000+" label="Users" />
        <StatBox number="500+" label="Projects" />
        <StatBox number="250+" label="Reviews" />
        <StatBox number="100+" label="Partners" />
      </div>
    </div>

  </div>
);
