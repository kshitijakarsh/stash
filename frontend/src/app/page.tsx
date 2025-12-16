import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/Hero";
import WhyStash from "@/components/sections/WhyStash";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-[#FAEFE9] to-[#E2D5C2] w-full max-w-full">
      <Navbar />
      <HeroSection />
      <WhyStash />
    </div>
  );
}
