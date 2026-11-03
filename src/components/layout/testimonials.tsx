"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "\u201CThe Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.\u201D",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/travelers/michael-chen.jpg",
  },
  {
    quote:
      "\u201CSwiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!\u201D",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/travelers/sarah-johnson.jpg",
  },
  {
    quote:
      "\u201CThe Santorini Escape Was A Dream Come True. Flawless Planning And Stunning Sunsets Every Single Evening.\u201D",
    name: "Emily Ross",
    location: "London, UK",
    image: "/images/travelers/emily-ross.jpg",
  },
  {
    quote:
      "\u201CKyoto And Tokyo Were Beyond Amazing. The Cherry Blossom Tour Was A Once In A Lifetime Experience.\u201D",
    name: "Daniel Weiss",
    location: "Berlin, Germany",
    image: "/images/travelers/daniel-weiss.jpg",
  },
  {
    quote:
      "\u201CThe Machu Picchu Trek Was Beyond Everything We Imagined. Perfect Acclimatization Schedule And A Truly World Class Guide.\u201D",
    name: "Joshua Park",
    location: "Toronto, Canada",
    image: "/images/travelers/joshua-park.jpg",
  },
  {
    quote:
      "\u201CThe Rajasthan Royal Tour Was Pure Luxury. Every Palace Hotel And Heritage Walk Was Thoughtfully Curated For Us.\u201D",
    name: "Priya Sharma",
    location: "Mumbai, India",
    image: "/images/travelers/priya-sharma.jpg",
  },
  {
    quote:
      "\u201CThe Norwegian Fjords Cruise Was Spectacular. Seamless Transfers, Cozy Cabins And Views Worth Waking Up Early For.\u201D",
    name: "Lucas Moreau",
    location: "Paris, France",
    image: "/images/travelers/lucas-moreau.jpg",
  },
];

const CARD_GAP = 28;

/* Rendered 3x: the track scrolls within the middle copy and silently
   re-normalizes into identical pixels, so it loops forever. */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <article className="flex w-[calc(100%-14px)] shrink-0 snap-start flex-col border border-[#ececec] bg-white p-7 md:w-[calc(50%-14px)] md:h-[340px] md:flex-row lg:h-[348px]">
      <div className="flex flex-1 flex-col justify-between md:pr-6 lg:pr-7">
        <blockquote className="text-[22px] leading-[1.36] text-[#1f2a30]">
          {testimonial.quote}
        </blockquote>
        <footer className="mt-8">
          <p className="text-[21px] text-[#3b9ec1]">
            &mdash; {testimonial.name}
          </p>
          <p className="mt-1 pl-[26px] text-[15px] text-[#7b868c]">
            {testimonial.location}
          </p>
        </footer>
      </div>
      <div className="relative mt-7 h-[220px] w-full shrink-0 max-sm:hidden md:mt-0 md:h-auto md:w-[208px] lg:w-[247px]">
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          fill
          sizes="(min-width: 1024px) 247px, 208px"
          className="object-cover"
        />
      </div>
    </article>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Exact loop period: N cards + the gap between every pair of cards.
     scrollWidth/3 would drift by a third of a gap and cut cards off. */
  const measure = () => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("article");
    if (!track || !card) return null;
    const step = card.offsetWidth + CARD_GAP;
    return { step, period: testimonials.length * step };
  };

  /* Keep the viewport inside the middle copy of the tripled track.
     Jumps land on identical pixels, so they are invisible. */
  const normalize = () => {
    const track = trackRef.current;
    const size = measure();
    if (!track || !size) return;
    while (track.scrollLeft >= size.period * 1.5) {
      track.scrollLeft -= size.period;
    }
    while (track.scrollLeft < size.period * 0.5) {
      track.scrollLeft += size.period;
    }
  };

  /* Start the loop at the first card of the middle copy (Michael Chen)
     so the initial page shows exactly two flush cards. */
  useLayoutEffect(() => {
    const track = trackRef.current;
    const size = measure();
    if (!track || !size) return;
    if (track.scrollLeft === 0) {
      track.scrollLeft = size.period;
    }
  }, []);

  const scroll = (direction: "prev" | "next") => {
    const track = trackRef.current;
    const size = measure();
    if (!track || !size) return;
    normalize();
    track.scrollTo({
      left: track.scrollLeft + (direction === "next" ? size.step : -size.step),
      behavior: "smooth",
    });
  };

  return (
    <section className="font-display bg-white py-[110px]">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-normal text-[#16191a] sm:text-5xl md:text-[62px] md:leading-[1.1]">
              What Travelers Say
            </h2>
            <p className="mt-4 text-[19px] text-[#6b7b84]">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-6">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => scroll("prev")}
              className="flex size-16 cursor-pointer items-center justify-center rounded-full border border-[#dcdcdc] text-[#4a4a4a] transition-colors hover:border-[#9aa6ac] hover:text-[#16191a]"
            >
              <ArrowLeft className="size-6" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => scroll("next")}
              className="flex size-16 cursor-pointer items-center justify-center rounded-full border border-[#dcdcdc] text-[#4a4a4a] transition-colors hover:border-[#9aa6ac] hover:text-[#16191a]"
            >
              <ArrowRight className="size-6" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Cards (tripled for infinite loop) */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x gap-7 overflow-x-auto"
        >
          {[0, 1, 2].map((copy) =>
            testimonials.map((testimonial) => (
              <TestimonialCard
                key={`${copy}-${testimonial.name}`}
                testimonial={testimonial}
              />
            )),
          )}
        </div>
      </div>
    </section>
  );
}
