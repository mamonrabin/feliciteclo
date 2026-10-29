
"use client";

import Image from "next/image";
import sizeImg from "@/assets/products/sizeColum.webp";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Ruler } from "lucide-react";

const SizeModel = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] underline transition hover:bg-black hover:text-white">
        <Ruler className="h-3.5 w-3.5" />
        Size Chart
      </DialogTrigger>

     <DialogContent className="max-h-[90vh] w-[calc(100%-1rem)] !max-w-2xl overflow-y-auto border-0 bg-white p-4 sm:p-6 lg:w-[90vw] xl:w-[85vw]">
        <DialogHeader>
          <DialogTitle className="text-left text-sm font-black uppercase tracking-[0.2em]">
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <div className="relative mt-2 w-full">
          <Image
            src={sizeImg}
            alt="Clothing size chart with measurements"
            width={sizeImg.width}
            height={sizeImg.height}
            sizes="(max-width: 640px) 90vw, 640px"
            className="h-auto w-full rounded-sm object-contain"
            priority
          />
        </div>

        <p className="text-center text-[10px] font-medium uppercase tracking-wider text-gray-400">
          Please check your measurements before selecting a size.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SizeModel;
