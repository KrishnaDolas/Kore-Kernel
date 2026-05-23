// src/components/FoodHero.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import videoFile from "../assets/aivideo.webm";

export function FoodHero() {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Video sources array - add your videos here
  const videos = [{ mp4: videoFile }];

  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;

      const handleLoadedData = () => {
        console.log("Video loaded successfully!");
        setIsVideoLoaded(true);
      };

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
          videoRef.current.removeEventListener(
            "loadeddata",
            handleLoadedData
          );
          videoRef.current.removeEventListener("error", handleError);
        }
      };
    }
  }, [currentVideoIndex, currentVideo]);

  // Auto-advance slider every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [videos.length]);

  const goToVideo = (index) => {
    setIsVideoLoaded(false);
    setCurrentVideoIndex(index);
  };

  return (
    <section className="relative flex h-[45vh] w-full items-stretch justify-center overflow-hidden bg-black sm:h-[65vh] lg:h-[80vh]">
      {/* Loading placeholder */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-amber-900 via-amber-800 to-black" />
      )}

     {/* Background video */}
<video
  key={currentVideoIndex}
  ref={videoRef}
  src={currentVideo.mp4}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  disablePictureInPicture
  disableRemotePlayback
  className="
    absolute inset-0
    h-full w-full
    object-cover
    object-center
    transition-opacity duration-1000
    scale-[1.8]
    sm:scale-100
  "
  style={{
    opacity: isVideoLoaded ? 1 : 0,
    minWidth: "100%",
    minHeight: "100%",
    WebkitBackfaceVisibility: "hidden",
  }}
>
  Your browser does not support the video tag.
</video>

      {/* Minimal overlay for better video visibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

      {/* Bottom edge overlay to hide "veo" trademark - Mobile only */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent sm:hidden" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center px-4 py-6 text-left animate-fade-in sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 drop-shadow-lg sm:text-[11px]">
          Luxury in a Jar
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white drop-shadow-2xl sm:mt-2 sm:text-4xl lg:text-6xl">
          Kore & Kernel
        </h1>

        <p className="mt-2 text-base font-semibold text-white drop-shadow-lg sm:mt-3 sm:text-lg lg:text-xl">
          Pure by Nature. Honest by Choice.
        </p>

        <p className="mt-2 max-w-xl text-xs font-medium leading-relaxed text-white/95 drop-shadow-md sm:mt-4 sm:text-sm lg:text-base">
          Creamy, crunchy and chocolatey peanut butters made from premium nuts —
          perfect for toast, smoothies and desserts.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-8">
          <Button
            onClick={() => navigate("/products")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#BA5C1E] to-[#D97236] px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#D97236] hover:to-[#BA5C1E] hover:shadow-xl sm:px-8 sm:py-3.5 sm:text-sm"
          >
            Explore Products

            <svg
              className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
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
        <div className="mt-4 flex items-center justify-center gap-3 sm:mt-10">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`h-2 rounded-full transition-all duration-300 sm:h-3 ${
                index === currentVideoIndex
                  ? "w-8 bg-amber-400 shadow-xl shadow-amber-400/70 sm:w-10"
                  : "w-2 bg-white/70 shadow-md hover:bg-white sm:w-3"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}