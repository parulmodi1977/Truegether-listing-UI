import { X } from "lucide-react";
import { useState } from "react";

function AdBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full mt-4 mb-2 lg:mt-10 lg:mb-6">
      {/* Sponsored Divider Label */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="h-[1px] bg-gray-200 flex-1"></div>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Sponsored
        </span>
        <div className="h-[1px] bg-gray-200 flex-1"></div>
      </div>

      {/* Ad Banner Body */}
      <div className="relative w-full h-[120px] rounded-lg overflow-hidden bg-[#0A0D14] flex items-center justify-between border border-gray-800 shadow-md">
        
        {/* Ad choices close button */}
        <div className="absolute top-1.5 right-1.5 z-10 flex items-center gap-1 bg-[#0A0D14]/80 px-1 py-0.5 rounded border border-gray-800 text-[10px] text-gray-500 font-medium">
          {/* AdChoices Info Icon */}
          <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-[9px] scale-90 select-none">
            i
          </span>
          <button 
            type="button" 
            onClick={() => setVisible(false)}
            aria-label="Close advertisement"
            className="hover:text-white cursor-pointer"
          >
            <X size={10} />
          </button>
        </div>

        {/* Left Side: Texas Instruments Branding */}
        <div className="flex items-center pl-6 sm:pl-8 select-none">
          <div className="flex items-center gap-2">
            {/* TI Logo Icon shape */}
            <div className="flex items-center justify-center h-8 w-8 bg-white rounded-md text-[#CC0000] font-black text-xl italic border border-gray-200 shadow-sm">
              ti
            </div>
            <div className="flex flex-col text-white font-bold tracking-tight">
              <span className="text-[13px] leading-none uppercase">Texas</span>
              <span className="text-[13px] leading-none uppercase">Instruments</span>
            </div>
          </div>
        </div>

        {/* Center Accent Line */}
        <div className="h-14 w-[2px] bg-[#CC0000] hidden md:block"></div>

        {/* Center Column: Slogan & Team Photo */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-8 h-full">
          <div className="flex items-center gap-6">
            <h3 className="text-white text-sm sm:text-base font-bold max-w-[280px] leading-snug text-center md:text-left">
              Build technology that powers real-world applications
            </h3>
            {/* Curated Developer/Engineer teammates photo */}
            <div className="h-[90px] w-[180px] rounded overflow-hidden hidden lg:block border border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=250&q=80" 
                alt="Teammates smiling" 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Right Side: CTA Button */}
        <div className="pr-10 sm:pr-14 shrink-0 flex items-center">
          <a 
            href="#" 
            className="text-[#CC0000] font-bold text-xs sm:text-sm hover:underline flex items-center gap-1 transition-all"
          >
            Explore open roles &gt;&gt;
          </a>
        </div>

      </div>
    </div>
  );
}

export default AdBanner;
