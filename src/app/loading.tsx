
const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-dvh w-full flex-col items-center justify-center bg-[#F7F7F5]">
      {/* Brand */}
      <div className="flex flex-col items-center">
        <h1 className="animate-pulse text-5xl font-bold tracking-[-0.08em] text-[#171717] sm:text-6xl">
          TITASWEB
        </h1>

        {/* Animated progress line */}
        <div className="mt-8 h-[2px] w-40 overflow-hidden bg-black/10">
          <div className="h-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite] bg-black" />
        </div>

        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.35em] text-black/40">
          Curating Your Style
        </p>
      </div>

      {/* Bottom text */}
      <p className="absolute bottom-10 text-[9px] uppercase tracking-[0.3em] text-black/30">
        Contemporary Fashion
      </p>
    </div>
  );
};

export default Loading;
