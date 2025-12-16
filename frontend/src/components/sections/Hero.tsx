import { Button } from "../ui/button";
import HeroCenterComponent from "../HeroCenterComponent";

export default function HeroSection() {
  return (
    <div className="flex justify-center mt-10 ">
      <div className="w-full max-w-7xl h-180 rounded-xl shadow-sm bg-linear-to-b from-[#D9D9D9]/40 to-[#737373]/10">
        <div className="mx-auto mt-6 max-w-4xl text-center font-slab">
          <h1 className="text-4xl leading-tight">
            Turn Digital Chaos into Clarity with Stash
          </h1>

          <div className="max-w-3xl mx-auto">
            <p className="mt-4 text-base text-gray-600 font-sans">
              Effortlessly save and organize your links in seconds. With smart
              AI sorting and seamless extension support, you’ll never lose a
              great webpage again.
            </p>
          </div>

          <div className="mt-5">
            <Button>Get Started</Button>
          </div>
        </div>
        <HeroCenterComponent />
      </div>
    </div>
  );
}
