import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/ 3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="font-display relative flex min-h-screen flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* Hero content */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 pt-28 text-center text-white">
        <h1 className="text-4xl font-light leading-[1.12] tracking-[0.005em] sm:text-6xl md:text-[92px]">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-7 max-w-[700px] text-[21px] leading-[1.45] text-white/95">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#destinations"
            className="inline-flex h-[58px] items-center gap-9 bg-[#3ea3c3] px-7 text-[15px] font-medium tracking-[0.03em] text-white transition-colors hover:bg-[#3593b4]"
          >
            EXPLORE NOW
            <ArrowRight className="size-[22px]" strokeWidth={2} />
          </a>
          <button
            type="button"
            className="h-[58px] cursor-pointer bg-white/30 px-8 text-[15px] font-medium tracking-[0.03em] text-white backdrop-blur-[2px] transition-colors hover:bg-white/40"
          >
            VIEW DESTINATION
          </button>
        </div>
      </div>

      {/* Search bar */}
      <form className="relative grid grid-cols-2 border-t border-white/40 lg:grid-cols-[repeat(4,1fr)_216px]">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="bg-white/25 px-8 py-[13px] backdrop-blur-sm max-lg:even:border-l max-lg:[&:nth-child(n+3)]:border-t lg:border-l lg:first:border-l-0"
          >
            <label
              htmlFor={`search-${field.label}`}
              className="block text-[20px] font-semibold leading-[1.2] text-[#22333e]"
            >
              {field.label}
            </label>
            <input
              id={`search-${field.label}`}
              type="text"
              placeholder={field.placeholder}
              className="mt-[3px] w-full bg-transparent text-[15px] text-[#22333e] placeholder:text-[#22333e]/90 focus:outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          className="max-lg:col-span-2 cursor-pointer bg-[#3ea3c3] py-[24px] text-[20px] font-semibold text-white transition-colors hover:bg-[#3593b4]"
        >
          Search
        </button>
      </form>
    </section>
  );
}
