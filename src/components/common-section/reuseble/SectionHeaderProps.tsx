
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  isBeginning?: boolean;
  isEnd?: boolean;
}

const SectionHeader = ({
  title,
  subtitle,
  icon,
  onPrev,
  onNext,
  isBeginning = false,
  isEnd = false,
}: SectionHeaderProps) => {
  return (
    <div className="mb-10 flex items-end justify-between gap-4">
      <div className="space-y-2">
        {subtitle && (
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
            {icon && <span>{icon}</span>}
            {subtitle}
          </p>
        )}

        <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>

      {onPrev && onNext && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={onPrev}
            disabled={isBeginning}
            className="flex size-10 items-center justify-center border border-black transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={onNext}
            disabled={isEnd}
            className="flex size-10 items-center justify-center border border-black transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
