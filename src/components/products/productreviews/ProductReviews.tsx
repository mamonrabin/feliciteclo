"use client";

import { useMemo, useState } from "react";
import { Star, ThumbsUp, MessageSquareText, Plus, X } from "lucide-react";
import ReviewForm from "./ReviewForm";

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  size?: string;
  verified?: boolean;
  helpful: number;
};

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Rahim Ahmed",
    rating: 5,
    date: "October 18, 2026",
    title: "Exactly what I wanted",
    comment:
      "The quality is amazing. The fabric feels premium and the oversized fit looks really good. Definitely worth it.",
    size: "XL",
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    rating: 4,
    date: "October 12, 2026",
    title: "Great fit and quality",
    comment:
      "Really nice material and clean finishing. The style looks even better in person.",
    size: "L",
    verified: true,
    helpful: 6,
  },
  {
    id: 3,
    name: "Sakib Hasan",
    rating: 5,
    date: "October 5, 2026",
    title: "Premium feel",
    comment:
      "Loved the heavyweight fabric and the overall design. Would definitely recommend it.",
    size: "2XL",
    verified: true,
    helpful: 4,
  },
];

const StarRating = ({
  rating,
  size = 15,
}: {
  rating: number;
  size?: number;
}) => (
  <div
    className="flex items-center gap-0.5"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={size}
        strokeWidth={1.5}
        className={
          index < rating ? "fill-[#087096] text-[#087096]" : "text-gray-300"
        }
      />
    ))}
  </div>
);

const ProductReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("recent");
  const [showForm, setShowForm] = useState(false);
  const [helpfulIds, setHelpfulIds] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const averageRating = useMemo(
    () =>
      reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0,
    [reviews],
  );

  const filteredReviews = useMemo(() => {
    const result =
      filter === "All"
        ? [...reviews]
        : reviews.filter((review) => review.rating === Number(filter));

    return result.sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      return b.id - a.id;
    });
  }, [reviews, filter, sort]);

  const ratingCount = (value: number) =>
    reviews.filter((review) => review.rating === value).length;

  const submitReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      rating,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      title: title.trim(),
      comment: comment.trim(),
      verified: false,
      helpful: 0,
    };

    setReviews((current) => [newReview, ...current]);
    setFilter("All");
    setSort("recent");
    setVisibleCount((current) => Math.max(current, reviews.length + 1));
    setName("");
    setTitle("");
    setComment("");
    setRating(5);
    setShowForm(false);
  };

  const toggleHelpful = (id: number) => {
    if (helpfulIds.includes(id)) return;

    setHelpfulIds((current) => [...current, id]);
    setReviews((current) =>
      current.map((review) =>
        review.id === id ? { ...review, helpful: review.helpful + 1 } : review,
      ),
    );
  };

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087096]">
              The Oqtos Experience
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-gray-950 md:text-4xl">
              Customer stories<span className="text-[#087096]">.</span>
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Real feedback on the fit, fabric, and details that make every
              piece special.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex w-fit items-center justify-center gap-2 border border-gray-900 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:bg-gray-950 hover:text-white"
          >
            <Plus size={14} />
            Write a review
          </button>
        </div>

        {/* Rating summary */}
        <div className="grid gap-8 border-b border-gray-200 pb-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex items-end gap-3">
              <span className="text-6xl font-light tracking-tight text-gray-950">
                {averageRating.toFixed(1)}
              </span>
              <span className="mb-2 text-sm text-gray-400">/ 5</span>
            </div>

            <div className="mt-3">
              <StarRating rating={Math.round(averageRating)} size={17} />
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Based on {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3">
            {[5, 4, 3, 2, 1].map((value) => {
              const count = ratingCount(value);
              const percentage = reviews.length
                ? (count / reviews.length) * 100
                : 0;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFilter(filter === String(value) ? "All" : String(value))
                  }
                  aria-pressed={filter === String(value)}
                  className="group flex items-center gap-3 text-xs"
                >
                  <span className="w-3 text-left text-gray-600">{value}</span>
                  <Star size={12} className="fill-[#087096] text-[#087096]" />
                  <span className="h-1.5 flex-1 overflow-hidden bg-gray-100">
                    <span
                      className="block h-full bg-[#087096] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </span>
                  <span className="w-5 text-right text-gray-400">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews toolbar */}
        <div className="flex flex-col gap-4 border-b border-gray-200 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-950">
              What people think
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {filteredReviews.length}{" "}
              {filteredReviews.length === 1 ? "review" : "reviews"}
              {filter !== "All" ? ` · ${filter} stars` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-1.5">
              {["All", "5", "4", "3", "2", "1"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setFilter(value);
                    setVisibleCount(3);
                  }}
                  className={`px-3 py-2 text-[10px] font-medium transition ${
                    filter === value
                      ? "bg-gray-950 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {value === "All" ? "All" : `${value} ★`}
                </button>
              ))}
            </div>

            <select
              aria-label="Sort reviews"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-[#087096]"
            >
              <option value="recent">Most recent</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>
        </div>

        {/* Review list */}
        {filteredReviews.length ? (
          <div className="divide-y divide-gray-200">
            {filteredReviews.slice(0, visibleCount).map((review) => (
              <article key={review.id} className="py-7 md:py-9">
                <div className="flex gap-4 sm:gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#087096]/10 text-sm font-medium uppercase text-[#087096]">
                    {review.name.charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="text-sm font-semibold text-gray-950">
                        {review.name}
                      </h4>

                      {review.verified && (
                        <span className="text-[9px] font-medium uppercase tracking-wider text-[#087096]">
                          Verified buyer
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <StarRating rating={review.rating} size={13} />
                      <span className="text-[11px] text-gray-400">
                        {review.date}
                      </span>
                      {review.size && (
                        <span className="border border-gray-200 px-2 py-1 text-[9px] uppercase tracking-wider text-gray-500">
                          Size {review.size}
                        </span>
                      )}
                    </div>

                    <h5 className="mt-4 text-sm font-semibold text-gray-900">
                      {review.title}
                    </h5>

                    <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
                      {review.comment}
                    </p>

                    <button
                      type="button"
                      disabled={helpfulIds.includes(review.id)}
                      onClick={() => toggleHelpful(review.id)}
                      className="mt-4 inline-flex items-center gap-2 text-[11px] text-gray-500 transition hover:text-[#087096] disabled:cursor-default disabled:opacity-60"
                    >
                      <ThumbsUp size={13} />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <MessageSquareText
              className="mx-auto mb-4 text-gray-300"
              size={30}
            />
            <p className="text-sm font-medium text-gray-900">
              No reviews in this category yet.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="mt-3 text-xs text-[#087096] underline underline-offset-4"
            >
              View all reviews
            </button>
          </div>
        )}

        {filteredReviews.length > visibleCount && (
          <div className="border-t border-gray-200 py-8 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 3)}
              className="border border-gray-300 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:border-gray-950 hover:bg-gray-950 hover:text-white"
            >
              Load more reviews
            </button>
          </div>
        )}

        {/* Write review dialog */}
        <ReviewForm
          open={showForm}
          onOpenChange={setShowForm}
          onSubmit={({ name, rating, title, comment }) => {
            const newReview: Review = {
              id: Date.now(),
              name,
              rating,
              title,
              comment,
              date: new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
              verified: false,
              helpful: 0,
            };

            setReviews((current) => [newReview, ...current]);
            setFilter("All");
            setSort("recent");
            setVisibleCount((current) => Math.max(current, reviews.length + 1));
            setShowForm(false);
          }}
        />
      </div>
    </section>
  );
};

export default ProductReviews;
