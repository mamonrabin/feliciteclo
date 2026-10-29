
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Film,
  Play,
  Pause,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

import videoThumbul from "@/assets/banner/videoimage.webp"


const posterSrc = videoThumbul.src;

const formatTime = (time: number) => {
  if (!Number.isFinite(time)) return "00:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const Campaing = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Video playback failed:", error);
      }
    } else {
      video.pause();
    }
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    setCurrentTime(0);
    setHasStarted(false);
  };

  const replayVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;

    try {
      await video.play();
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;
    video.muted = value === 0;

    setVolume(value);
    setIsMuted(video.muted);
  };

  const seekVideo = (value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black md:px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[24px_24px] opacity-50" />

      <div className="site-container relative z-10">
        {/* Campaign Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                <Film className="size-3 text-white" />
                Campaign Archive 2026
              </span>

              <span className="text-zinc-600">/</span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Autumn / Winter Capsule
              </span>
            </div>

            <h2 className="text-xl font-black uppercase tracking-tight sm:text-3xl lg:text-4xl">
              Autumn &apos;26 Visual Manifesto
            </h2>

            <p className="mt-2 max-w-xl text-xs font-light tracking-wide text-zinc-400 sm:text-sm">
              Contemporary silhouettes, brutalist tailoring,
              and architectural drape. Witness the collection
              in fluid motion.
            </p>
          </div>

          <Link
            href="/collections"
            className="group inline-flex w-fit items-center gap-2 border border-white/20 bg-white/5 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:border-white hover:bg-white hover:text-black"
          >
            Explore Looks
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Video Player */}
        <div
          ref={containerRef}
          className="group relative aspect-video w-full overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl select-none"
        >
          {/* Brand Watermark */}
          <div className="pointer-events-none absolute left-3 top-3 z-20 text-[10px] font-bold uppercase tracking-widest text-white/50">
            FELICITÉ
          </div>

          <video
            ref={videoRef}
            src="/videos/party.mp4"
            poster={posterSrc}
            playsInline
            preload="metadata"
            muted
            onClick={togglePlay}
            onPlay={() => {
              setIsPlaying(true);
              setHasStarted(true);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={(e) =>
              setCurrentTime(e.currentTarget.currentTime)
            }
            onLoadedMetadata={(e) =>
              setDuration(e.currentTarget.duration)
            }
            className="h-full w-full cursor-pointer object-cover"
          />

          {/* Initial Play Overlay */}
          {!hasStarted && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Play campaign film"
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]"
            >
              <div className="relative flex items-center justify-center">
                <div className="pointer-events-none absolute -inset-4 animate-ping rounded-full border border-white/25 opacity-25" />

                <div className="pointer-events-none absolute -inset-2 rounded-full border border-white/40" />

                <div className="flex size-20 items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300 hover:border hover:border-white hover:bg-black hover:text-white sm:size-24">
                  <Play className="ml-1 size-8 fill-current sm:size-10" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border border-white/20 bg-black/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                <Film className="size-3 text-white" />
                <span>Play Campaign Film</span>
                <span className="text-zinc-500">·</span>
                <span>{formatTime(duration)}</span>
              </div>
            </button>
          )}

          {/* Custom Video Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-30 bg-linear-to-t from-black/95 via-black/80 to-transparent px-4 pb-4 pt-12 transition-all duration-300 sm:px-6 ${
              isPlaying
                ? "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                : "translate-y-0 opacity-100"
            }`}
          >
            {/* Progress Bar */}
            <input
              type="range"
              min={0}
              max={duration || 1}
              step={0.1}
              value={Math.min(currentTime, duration || 1)}
              onChange={(e) =>
                seekVideo(Number(e.target.value))
              }
              aria-label="Video progress"
              className="mb-3 h-2 w-full cursor-pointer accent-white"
            />

            <div className="flex items-center justify-between gap-3">
              {/* Left Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="flex size-9 items-center justify-center border border-white/20 bg-white/10 transition-colors hover:bg-white hover:text-black sm:size-10"
                >
                  {isPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="ml-0.5 size-4 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={stopVideo}
                  aria-label="Stop video"
                  className="flex h-9 items-center gap-1.5 border border-white/20 bg-white/5 px-2.5 text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white sm:h-10 sm:px-3"
                >
                  <Square className="size-3 fill-current" />
                  <span className="hidden text-[10px] font-bold uppercase tracking-wider sm:inline">
                    Stop
                  </span>
                </button>

                <button
                  type="button"
                  onClick={replayVideo}
                  aria-label="Replay video"
                  className="flex size-9 items-center justify-center border border-white/20 bg-white/5 text-zinc-300 transition-colors hover:bg-white/20 hover:text-white sm:size-10"
                >
                  <RotateCcw className="size-3.5" />
                </button>

                <div className="ml-1 text-[11px] tracking-wide tabular-nums text-zinc-300 sm:ml-2 sm:text-xs">
                  <span className="font-bold text-white">
                    {formatTime(currentTime)}
                  </span>
                  <span className="mx-1 text-zinc-500">/</span>
                  <span className="text-zinc-400">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex size-9 items-center justify-center border border-white/20 bg-white/5 transition-colors hover:bg-white/20 sm:size-10"
                  >
                    {isMuted ? (
                      <VolumeX className="size-4 text-red-400" />
                    ) : (
                      <Volume2 className="size-4" />
                    )}
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) =>
                      changeVolume(Number(e.target.value))
                    }
                    aria-label="Volume"
                    className="hidden h-1 w-14 cursor-pointer accent-white sm:block sm:w-20"
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={
                    isFullscreen
                      ? "Exit fullscreen"
                      : "Enter fullscreen"
                  }
                  className="flex size-9 items-center justify-center border border-white/20 bg-white/5 transition-colors hover:bg-white/20 sm:size-10"
                >
                  {isFullscreen ? (
                    <Minimize className="size-4" />
                  ) : (
                    <Maximize className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 text-[10px] uppercase tracking-widest text-zinc-400 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Film className="size-3 text-zinc-300" />
            <span>FELICITÉ Campaign Archive</span>
          </div>

          <p className="text-zinc-500">
            All Rights Reserved © 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default Campaing;
