import { Navbar } from "../components/organisms/Navbar";
import Beranda from "./home/Beranda";
import TentangKami from './about/TentangKami';
import Galeri from "./galery/Galeri";
import Sylabus from "./sylabus/Sylabus";
import Program from "./sylabus/Program";
import FAQ from "./contact/FAQ";
import { Footer }  from "../components/organisms/Footer";

export default function Home() {
  return (
    <div className={`flex flex-col min-h-screen bg-white font-sans`}>
      <div className="relative">
        
        <Beranda />
        <TentangKami />
        <Galeri />
        <Sylabus />
        <Program />
        <FAQ />
        <Footer />

        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md">
          <Navbar />
        </nav>

      </div>
    </div>
  );
}