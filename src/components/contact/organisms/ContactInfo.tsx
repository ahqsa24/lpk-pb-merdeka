import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Heading } from "../../shared/atoms";

const ContactItem = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors duration-200">
        <div className="p-3 bg-red-100 text-red-600 rounded-lg flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-gray-600 text-sm">{content}</p>
        </div>
    </div>
);

const ContactInfo = () => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 h-full">
            <Heading className="text-2xl mb-6">Hubungi Kami</Heading>

            <div className="space-y-2">
                <ContactItem
                    icon={<MapPin className="w-5 h-5" />}
                    title="Lokasi Kantor"
                    content="Gedung Merdeka Lt. 5, Jl. Jend. Sudirman No. 123, Jakarta Selatan, 12190"
                />
                <ContactItem
                    icon={<Phone className="w-5 h-5" />}
                    title="Telepon / WhatsApp"
                    content="+62 812-3456-7890"
                />
                <ContactItem
                    icon={<Mail className="w-5 h-5" />}
                    title="Alamat Email"
                    content="info@lpkmerdeka.co.id"
                />
                <ContactItem
                    icon={<Clock className="w-5 h-5" />}
                    title="Jam Operasional"
                    content="Senin - Jumat, 09:00 - 17:00 WIB"
                />
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm mb-4">Temukan kami di Google Maps</p>
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                    {/* Placeholder for map */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96205705335!2d106.73365319409848!3d-6.284242637256965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1717382348234!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
