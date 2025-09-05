
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Volume2, VolumeOff } from "lucide-react";
import  { Badge } from "../../components/common/header";
import { Link } from "react-router-dom";


export default function HomeHeader() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <>
      <header
        className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 pb-0 pt-32 md:pb-6 bg-white"
      >
        <div className="w-full max-w-3xl flex flex-col items-center text-center mx-auto z-10">
          {/* Badge/Tag (optional, for B2B trust) */}
          <Badge title="AI-Powered Legal Document Simplification" />

          {/* Heading */}
          <h1
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ opacity: 1 }}
          >
            Grammarly for Legal Documents
          </h1>

          {/* Subheading */}
          {/* <div>
            <Description
              title="Our AI-powered platform simplifies complex legal documents like rental agreements, loan contracts, and terms of service into clear, easy-to-understand guidance. We help you uncover hidden clauses, understand your rights, and make informed decisions with confidence."
            />
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 justify-center mb-8 mt-4">
            <Link
              to="/dashboard"
              className="bg-gradient-to-br from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-gray-800 hover:bg-[#e0e7ef] focus:ring-[#b1b4b6] border border-[#b1b4b6] hover:from-[#e0e7ef] hover:via-[#f3f4f6] hover:to-[#f9fafb] font-bold px-8 py-3 rounded-full shadow-lg transition text-lg tracking-wide"
            >
              Analyze My Document →
            </Link>
          </div>
        </div>

        {/* Centered video section */}
        <div className="relative w-full md:w-4/5 lg:w-2/3 aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-[#f3e9d2] bg-white mx-auto">
          {/* Loader overlay */}
          {videoLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-70">
              <Loader2 className="animate-spin w-12 h-12 text-[#a1a5ab]" />
            </div>
          )}
          <video
            ref={videoRef}
            src="/Introduction.mp4"
            preload="auto"
            autoPlay
            loop
            muted={muted}
            playsInline
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoading(false)}
            onCanPlay={() => setVideoLoading(false)}
          />

          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition cursor-pointer border border-[#CDA047] z-30"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? (
              <VolumeOff className="w-6 h-6 text-[#CDA047]" />
            ) : (
              <Volume2 className="w-6 h-6 text-[#CDA047]" />
            )}
          </button>
        </div>
      </header>
    </>
  );
}