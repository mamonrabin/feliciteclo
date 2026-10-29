
"use client";

import { inter } from "@/app/font";
import { ArrowRight, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HomeOverlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Start fade-out animation
  const handleStart = () => {
    if (isExiting || isHidden) return;

    setIsExiting(true);

    timeoutRef.current = setTimeout(() => {
      setIsHidden(true);
    }, 1000);
  };

  // Support Enter key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Enter" &&
        !event.repeat &&
        !isExiting &&
        !isHidden
      ) {
        event.preventDefault();
        handleStart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExiting, isHidden]);

  // Cleanup audio and timer
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (hoverAudioRef.current) {
        hoverAudioRef.current.pause();
        hoverAudioRef.current = null;
      }
    };
  }, []);

  // Toggle video sound
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Play hover sound
  const playHoverSound = () => {
    if (isExiting) return;

    if (!hoverAudioRef.current) {
      hoverAudioRef.current = new Audio("/sounds/hover-tok.mp3");
      hoverAudioRef.current.volume = 0.35;
    }

    const audio = hoverAudioRef.current;
    audio.currentTime = 0;

    void audio.play().catch(() => {});
  };

  if (isHidden) return null;

  return (
    <section
      className={`site-container fixed inset-0 z-50 flex min-h-dvh flex-col overflow-hidden bg-black py-6 transition-[opacity,transform] duration-1000 ease-in-out md:py-10 ${inter.className} ${
        isExiting
          ? "pointer-events-none scale-105 opacity-0"
          : "scale-100 opacity-100"
      }`}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source
          src="/videos/overlayvideo.webm"
          type="video/webm"
        />
      </video>

      {/* Dark Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between text-white">
        <h2 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-xs">
          <span className="inline-block h-1.5 w-1.5 bg-white" />
          <span>FÉLICITÉ</span>
        </h2>

        <button
          type="button"
          onClick={toggleSound}
          disabled={isExiting}
          aria-label={
            isMuted
              ? "Unmute entrance video"
              : "Mute entrance video"
          }
          aria-pressed={!isMuted}
          className="flex cursor-pointer items-center gap-2 border border-white/40 bg-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-200 hover:border-white hover:bg-white hover:text-black disabled:cursor-default sm:px-3.5 sm:py-2 sm:text-xs"
        >
          {isMuted ? (
            <VolumeOff
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ) : (
            <Volume2
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          )}

          <span className="font-semibold">
            SOUND {isMuted ? "OFF" : "ON"}
          </span>
        </button>
      </header>

      {/* Hero Content */}
      <main className="relative z-20 flex flex-1 flex-col items-center justify-center px-2 py-12 text-center text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:mb-3 sm:text-xs sm:tracking-[0.45em] md:text-sm">
            [ AUTUMN / WINTER 2026 ]
          </div>

          <h1 className="my-1 pl-[0.12em] text-[clamp(2.8rem,9.5vw,8.5rem)] font-black uppercase leading-none tracking-[0.12em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] sm:my-2 sm:pl-[0.18em] sm:tracking-[0.18em]">
            FÉLICITÉ
          </h1>

          <p className="mt-1 max-w-lg text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:mt-2 sm:text-xs sm:tracking-[0.35em] md:text-sm">
            CONTEMPORARY LUXURY WEAR
          </p>

          {/* START Button */}
          <div className="group relative mt-6 sm:mt-9 md:mt-12">
            <button
              type="button"
              onClick={handleStart}
              onMouseEnter={playHoverSound}
              onFocus={playHoverSound}
              disabled={isExiting}
              aria-label="Start and enter Félicité"
              className="relative flex cursor-pointer items-center justify-center gap-3 border-2 border-white bg-black/25 px-8 py-3.5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black active:scale-95 focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-default sm:gap-4 sm:px-14 sm:py-4.5 md:px-18 md:py-5"
            >
              <span className="pl-[0.3em] text-base font-black uppercase tracking-[0.3em] sm:pl-[0.4em] sm:text-xl sm:tracking-[0.4em] md:text-2xl">
                START
              </span>

              <ArrowRight
                className="-ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5 md:h-6 md:w-6"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:mt-6 sm:text-[11px]">
            CLICK OR PRESS [ENTER]
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 flex w-full shrink-0 items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] sm:text-[11px]">
        <div className="flex items-center gap-2">
          <span>PARIS</span>
          <span className="text-white/40">·</span>
          <span>DHAKA</span>
          <span className="text-white/40">·</span>
          <span>TOKYO</span>
        </div>

        <div className="text-right tracking-[0.15em] text-white/60">
          © 2026 FÉLICITÉ
        </div>
      </footer>
    </section>
  );
};

export default HomeOverlayer;
