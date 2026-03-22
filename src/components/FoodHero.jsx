// src/components/FoodHero.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";

export function FoodHero() {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Video sources array - add your videos here
  const videos = [
    { mp4: "/mainfinal.mp4" }, // Final video from public folder
  ];

  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    // Ensure smooth playback on mount
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down video to 75% speed

      // Handle video loaded
      const handleLoadedData = () => {
        console.log("Video loaded successfully!");
        setIsVideoLoaded(true);
      };

      // Handle video errors
      const handleError = (e) => {
        console.error("Video loading error:", e);
        console.error("Video source:", currentVideo.mp4);
      };

      videoRef.current.addEventListener("loadeddata", handleLoadedData);
      videoRef.current.addEventListener("error", handleError);

      videoRef.current.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("loadeddata", handleLoadedData);
          videoRef.current.removeEventListener("error", handleError);
        }
      };
    }
  }, [currentVideoIndex, currentVideo]);

  // Auto-advance slider every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000); // Change video every 10 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  const goToVideo = (index) => {
    setIsVideoLoaded(false);
    setCurrentVideoIndex(index);
  };

  return (
    <section className="relative flex h-[30vh] w-full items-stretch justify-center overflow-hidden bg-black sm:h-[45vh] lg:h-[50vh]">
      {/* Loading placeholder */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-black animate-pulse" />
      )}

      {/* Background video with optimized quality settings */}
      <video
        key={currentVideoIndex}
        ref={videoRef}
        src={currentVideo.mp4}
        className="absolute transition-opacity duration-1000 scale-[2.5] sm:scale-110 lg:scale-110"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        style={{
          opacity: isVideoLoaded ? 1 : 0,
          width: "100%",
          height: "auto",
          minHeight: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          WebkitTransform: "translate(-50%, -50%)",
          objectFit: "cover",
          objectPosition: "center center",
          imageRendering: "-webkit-optimize-contrast",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Minimal overlay for better video visibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

      {/* Bottom edge overlay to hide "veo" trademark - Mobile only */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent sm:hidden" />

      {/* Content with fade-in animation - Left aligned */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-center h-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-left animate-fade-in">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300 drop-shadow-lg">
          Luxury in a Jar
        </p>

        <h1 className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-bold text-white lg:text-6xl drop-shadow-2xl">
          Kore & Kernel 
        </h1>

        <p className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-white lg:text-xl drop-shadow-lg">
          Pure by Nature. Honest by Choice.
        </p>

        <p className="mt-2 sm:mt-4 max-w-xl text-xs sm:text-sm text-white/95 lg:text-base drop-shadow-md leading-relaxed font-medium">
          Creamy, crunchy and chocolatey peanut butters made from premium nuts —
          perfect for toast, smoothies and desserts.
        </p>

        <div className="mt-4 sm:mt-8 flex flex-wrap items-center gap-4">
          <Button
            onClick={() => navigate("/products")}
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#BA5C1E] to-[#D97236] text-xs sm:text-sm font-semibold text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#D97236] hover:to-[#BA5C1E]"
          >
            Explore Products
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Button>
        </div>

        {/* Video slider navigation dots */}
        <div className="mt-4 sm:mt-10 flex items-center justify-center gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? "w-8 sm:w-10 bg-amber-400 shadow-xl shadow-amber-400/70"
                  : "w-2 sm:w-3 bg-white/70 hover:bg-white shadow-md"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
