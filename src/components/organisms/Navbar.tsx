import React from "react";
import Image from "next/image";
import { Navbar as NavbarMolecule } from "../molecules/Navbar";

export const Navbar = () => {
  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "silabus", label: "SIlabus" },
    { id: "galeri", label: "Galeri" },
    { id: "pendaftaran", label: "Pendaftaran" },
    { id: "bantuan", label: "Bantuan" },
  ];

  return (
    <NavbarMolecule
      logo={
        <div className="flex items-center gap-3">
          <Image
            src="/assets/LPK-White.png"
            alt="LPK Merdeka Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
      }
      navItems={navItems}
      onNavClick={(id) => console.log("Navigated to:", id)}
      onLoginClick={() => console.log("Login clicked")}
    />
  );
};
