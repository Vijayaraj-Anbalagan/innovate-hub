import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  link: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center rounded-full w-12 h-12 md:w-16 md:h-16 bg-green-500 text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <FaWhatsapp className="text-xl md:text-2xl lg:text-3xl" />
    </a>
  );
};

export default WhatsAppButton;
