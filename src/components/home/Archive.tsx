
import React from "react";

const Archive = () => {
  return (
    <section
      aria-label="Titasweb Brand Statement"
      className="relative flex select-none flex-col items-center justify-center overflow-x-clip border-y border-neutral-100 bg-white px-4 py-16 text-black sm:px-6 sm:py-20 md:py-28 lg:px-8"
    >
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="site-container relative z-10 flex w-full flex-col items-center justify-center px-2 text-center sm:px-4">
        {/* Archive Label */}
        <div className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4">
          <span className="h-px w-6 bg-neutral-200 sm:w-12" />

          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-400 sm:text-[11px] sm:tracking-[0.45em]">
            Autumn Archive 2026
          </p>

          <span className="h-px w-6 bg-neutral-200 sm:w-12" />
        </div>

        {/* Brand Name */}
        <div className="flex w-full items-center justify-center px-2 sm:px-6">
          <h2
            className="max-w-full cursor-default text-center text-[clamp(2.5rem,8.2vw,7.2rem)] leading-none font-black uppercase tracking-[0.04em] text-black drop-shadow-sm transition-all duration-500 ease-out hover:opacity-85 sm:tracking-[0.06em] lg:text-[7.8rem] xl:text-[8.5rem]"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            TITIAWÉB
          </h2>
        </div>

        {/* Brand Details */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-neutral-400 sm:mt-8 sm:gap-6">
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600 sm:text-[10px]">
            Contemporary Wear
          </span>

          <span className="hidden text-neutral-300 sm:inline-block">
            /
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600 sm:text-[10px]">
            Paris · Dhaka
          </span>

          <span className="hidden text-neutral-300 sm:inline-block">
            /
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">
            Haute Ready-to-Wear
          </span>
        </div>
      </div>
    </section>
  );
};

export default Archive;
