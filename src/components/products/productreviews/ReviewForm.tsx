
"use client";

import { Star, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ReviewFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (review: {
    name: string;
    rating: number;
    title: string;
    comment: string;
  }) => void;
};

const ReviewForm = ({
  open,
  onOpenChange,
  onSubmit,
}: ReviewFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      name: String(formData.get("name") ?? "").trim(),
      rating: Number(formData.get("rating") ?? 5),
      title: String(formData.get("title") ?? "").trim(),
      comment: String(formData.get("comment") ?? "").trim(),
    });

    event.currentTarget.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-white p-0 sm:max-w-lg">
        <div className="relative p-6 sm:p-8">
          <DialogHeader className="mb-7 space-y-3 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#087096]">
              Your experience matters
            </p>

            <DialogTitle className="text-2xl font-medium tracking-tight text-gray-950">
              Write a review
            </DialogTitle>

            <DialogDescription className="text-sm leading-6 text-gray-500">
              Share your thoughts on the fit, quality, and feel of this piece.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-gray-700">
                Your rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={value}
                      defaultChecked={value === 5}
                      className="peer sr-only"
                    />
                    <Star
                      size={24}
                      strokeWidth={1.5}
                      className="text-gray-300 transition peer-checked:fill-[#087096] peer-checked:text-[#087096]"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="review-name"
                className="mb-2 block text-xs font-medium text-gray-700"
              >
                Your name
              </label>
              <input
                id="review-name"
                name="name"
                required
                maxLength={80}
                placeholder="Enter your name"
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#087096]"
              />
            </div>

            <div>
              <label
                htmlFor="review-title"
                className="mb-2 block text-xs font-medium text-gray-700"
              >
                Review title
              </label>
              <input
                id="review-title"
                name="title"
                required
                maxLength={120}
                placeholder="Summarize your experience"
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#087096]"
              />
            </div>

            <div>
              <label
                htmlFor="review-comment"
                className="mb-2 block text-xs font-medium text-gray-700"
              >
                Your review
              </label>
              <textarea
                id="review-comment"
                name="comment"
                required
                minLength={5}
                maxLength={1500}
                rows={4}
                placeholder="How was the product?"
                className="w-full resize-y border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#087096]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#087096] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#075d7a]"
            >
              Submit review
            </button>

            <p className="text-center text-[10px] leading-5 text-gray-400">
              Your feedback helps other customers make informed choices.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
