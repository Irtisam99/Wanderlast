"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

export type FeaturedDestination = {
  _id: string;
  id?: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  imageUrl: string;
};

// Same padding the 90%/max-1440 container produces, so the first card sits
// flush with the heading while later cards peek past the right page edge.
const EDGE_PAD = "max(5vw, calc((100vw - 1440px) / 2))";
const GAP = 28;

const FeaturedCarousel = ({
  destinations,
}: {
  destinations: FeaturedDestination[];
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [progress, setProgress] = useState(0);

  // Card step = one card + gap; the API returns plain string `_id`s.
  const leftIndex = Math.max(0, page - 1);
  const atStart = leftIndex === 0;
  // With two cards visible, the last reachable step leaves page = count - 1.
  const atEnd = progress >= 0.999;

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;
    const step = track.firstElementChild.clientWidth + GAP;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setPage(Math.round(track.scrollLeft / step) + 1);
    setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track || !track.firstElementChild) return;
    const step = track.firstElementChild.clientWidth + GAP;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="font-display mt-12">
      {/* Scroll track — full-bleed so the third card cuts at the viewport edge */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        style={{
          paddingInlineStart: EDGE_PAD,
          paddingInlineEnd: EDGE_PAD,
          scrollPaddingInlineStart: EDGE_PAD,
        }}
        className="no-scrollbar snap-x snap-mandatory overflow-x-auto"
      >
        <div className="flex" style={{ gap: GAP }}>
          {destinations.map((item) => (
            <article
              key={item._id}
              className="w-[min(calc(45vw-14px),706px)] shrink-0 snap-start"
            >
              <div className="relative aspect-[556/365] overflow-hidden bg-[#eef4f6]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                {/* The database has no rating field yet — shown per the design. */}
                <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-white px-2.5 py-1 text-[13px] font-semibold text-[#16191a]">
                  4.5
                  <Star
                    className="size-3.5"
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden
                  />
                </span>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[15px] leading-none text-[#3d4b52]">
                <MapPin className="size-4 shrink-0" strokeWidth={1.8} />
                {item.country}
              </div>

              <div className="mt-1 flex items-center justify-between gap-3">
                <h3 className="text-[27px] font-normal leading-tight text-[#16191a]">
                  {item.name}
                </h3>
                <p className="shrink-0 text-[27px] font-semibold text-[#16191a]">
                  ${Number(item.price || 0).toLocaleString("en-US")}
                  <span className="text-[14px] font-normal text-[#4a666f]">
                    /Person
                  </span>
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[15px] text-[#3d4b52]">
                <CalendarDays className="size-4 shrink-0" strokeWidth={1.8} />
                {item.duration}
              </div>

              <Link
                href={`/destination/${item._id}`}
                className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium uppercase text-[#2f7f9b] underline underline-offset-4 transition-colors hover:text-[#3593b4]"
              >
                Book Now
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Pager strip: counter, progress line, arrows */}
      <div className="mx-auto mt-10 flex w-[90%] max-w-[1440px] items-center gap-10">
        <p className="shrink-0 text-[19px] text-[#16191a]">
          {Math.min(page, destinations.length)}/{destinations.length}
        </p>

        <div className="relative h-px flex-1 bg-[#e5e5e5]">
          <span
            className="absolute inset-y-0 left-0 bg-[#16191a]"
            style={{ width: `${Math.max(progress * 100, atStart ? 0 : 2)}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous destinations"
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-[#dcdcdc] text-[#3d4b52] transition-colors hover:bg-[#f6f8f9] disabled:cursor-not-allowed disabled:text-[#c4ccd0]"
          >
            <ArrowLeft className="size-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next destinations"
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-[#9aa4aa] text-[#16191a] transition-colors hover:bg-[#f6f8f9] disabled:cursor-not-allowed disabled:text-[#c4ccd0]"
          >
            <ArrowRight className="size-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCarousel;
