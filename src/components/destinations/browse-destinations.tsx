"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  MapPin,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";

export type Destination = {
  id?: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

const priceRanges = [
  {
    value: "under-1000",
    label: "Under 1000",
    test: (price: number) => price < 1000,
  },
  {
    value: "1000-4999",
    label: "1000 - 4999",
    test: (price: number) => price >= 1000 && price <= 4999,
  },
  {
    value: "5000-19999",
    label: "5000 - 19999",
    test: (price: number) => price >= 5000 && price <= 19999,
  },
  {
    value: "20000-above",
    label: "20000 & Above",
    test: (price: number) => price >= 20000,
  },
] as const;

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative flex h-11 items-center px-4">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={placeholder}
        className="w-full cursor-pointer appearance-none bg-transparent text-[13.5px] tracking-[0.05em] text-[#3f4a50] uppercase focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 size-4 text-[#8a959c]"
        strokeWidth={1.8}
        aria-hidden
      />
    </label>
  );
}

export default function BrowseDestinations({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("");
  const [range, setRange] = useState("");
  const [sort, setSort] = useState("");

  const categories = useMemo(
    () =>
      [...new Set(destinations.map((item) => item.category))]
        .filter(Boolean)
        .sort()
        .map((value) => ({ value, label: value })),
    [destinations],
  );

  const shown = useMemo(() => {
    const rangeOption = priceRanges.find((option) => option.value === range);
    let list = destinations.filter(
      (item) =>
        (!category || item.category === category) &&
        (!rangeOption || rangeOption.test(Number(item.price) || 0)),
    );
    if (sort === "price-asc") {
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [destinations, category, range, sort]);

  return (
    <>
      {/* Filter bar */}
      <div className="mt-7 grid grid-cols-1 divide-y divide-[#d8d8d8] rounded-[2px] border border-[#d8d8d8] sm:grid-cols-3 sm:divide-x">
        <FilterSelect
          value={category}
          onChange={setCategory}
          placeholder="Category"
          options={categories}
        />
        <FilterSelect
          value={range}
          onChange={setRange}
          placeholder="Price Range"
          options={priceRanges.map(({ value, label }) => ({ value, label }))}
        />
        <FilterSelect
          value={sort}
          onChange={setSort}
          placeholder="Sort By"
          options={[
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
            { value: "name-asc", label: "Name: A to Z" },
          ]}
        />
      </div>

      <p className="mt-6 text-[15px] text-[#4f6069]">
        Showing {shown.length} destination{shown.length === 1 ? "" : "s"}
      </p>

      {shown.length === 0 ? (
        <p className="mt-10 text-[17px] text-[#6b7b84]">
          No destinations found. Try clearing the filters or add a new travel
          package.
        </p>
      ) : (
        <div className="mt-5 grid gap-x-8 gap-y-10 pb-4 sm:grid-cols-2 md:grid-cols-3">
          { shown.map((item) => (
            <article key={item.id ?? item.name}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#eef4f6]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                {/* The database has no rating field yet — shown per the design. */}
                <span className="absolute right-2.5 top-2.5 flex items-center gap-1 bg-white px-2 py-1 text-[12.5px] font-semibold text-[#16191a]">
                  4.5
                  <Star
                    className="size-3"
                    fill="currentColor"
                    strokeWidth={0}
                    aria-hidden
                  />
                </span>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-[14px] leading-none text-[#3d4b52]">
                <MapPin className="size-4 shrink-0" strokeWidth={1.8} />
                {item.country}
              </div>

              <div className="mt-1.5 flex items-center justify-between gap-3">
                <h3 className="text-[20px] font-normal leading-tight text-[#1d2b32]">
                  {item.name}
                </h3>
                <p className="shrink-0 text-[17px] font-semibold text-[#1d2b32]">
                  ${Number(item.price || 0).toLocaleString("en-US")}
                  <span className="text-[10.5px] font-normal text-[#4a666f]">
                    /Person
                  </span>
                </p>
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-[14px] text-[#3d4b52]">
                <CalendarDays className="size-4 shrink-0" strokeWidth={1.8} />
                {item.duration}
              </div>
              
              <Link
                href={`/destination/${item.id}`}
                className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium uppercase text-[#3ea3c3] underline underline-offset-4 transition-colors hover:text-[#3593b4]"
              >
                Book Now
                <ArrowUpRight className="size-3.5" strokeWidth={2} />
              </Link>
            </article>
          ))
          
          }
        </div>
      )}
    </>
  );
}
