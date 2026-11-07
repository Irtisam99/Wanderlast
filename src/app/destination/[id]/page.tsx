export const dynamic = "force-dynamic";
import BookingCard from "@/components/booking/BookingCard";
import DeleteDestinationDialogue from "@/components/destinations/DeleteDestinationDialogue";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

// The database schema has no rating/reviews/highlights fields yet — these are
// shown per the design and replaceable once real data exists.
const RATING = "4.9";
const REVIEWS = "(234 reviews)";
const HIGHLIGHT_BULLETS = [
  "Luxury beachfront accommodation",
  "Traditional Balinese spa treatment",
  "Sunrise trek to Mount Batur",
  "Visit Uluwatu Temple at sunset",
  "Private beach dinner experience",
];


type Destination = {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let data: Destination | null = null;

  const token=await getTokenFromServer()
 

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
      cache: "no-store",
      headers:{
        authorization:`Bearer ${token}`
      }
    });
    if (!res.ok) notFound();
    data = (await res.json()) as Destination;
  } catch {
    notFound();
  }
  if (!data) notFound();



  return (
    <div className="font-display mx-auto w-[90%] max-w-[1440px] pb-24">
      {/* Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/destination"
          className="flex items-center gap-2 text-[17px] text-[#33424b] transition-colors hover:text-[#16191a]"
        >
          <ArrowLeft className="size-5 text-[#8a959c]" strokeWidth={1.8} />
          Back to Destinations
        </Link>
        <div className="flex items-center gap-3">

        <EditDestinationDialog id={id} datas={data} />
        <DeleteDestinationDialogue id={id}></DeleteDestinationDialogue>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-5 h-[300px] overflow-hidden bg-[#eef4f6] sm:h-[420px] lg:h-[485px]">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="absolute inset-0 size-full object-cover"
        />
      </div>

      <div className="my-9 h-px bg-[#ececec]" />

      {/* Content */}
      <div className="grid gap-14 lg:grid-cols-[1fr_374px]">
        <div>
          <p className="flex items-center gap-1.5 text-[17px] text-[#33424b]">
            <MapPin className="size-4 shrink-0" strokeWidth={1.8} />
            {data.country}
          </p>

          <h1 className="mt-2 text-5xl font-normal leading-[1.05] text-[#16191a] md:text-[56px]">
            {data.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5 text-[17px] leading-none">
              <Star
                className="size-4 text-[#34708a]"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden
              />
              <b className="font-semibold text-[#1d2b32]">{RATING}</b>
              <span className="text-[#6b7b84]">{REVIEWS}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[17px] leading-none text-[#1d2b32]">
              <CalendarDays className="size-4 shrink-0" strokeWidth={1.8} />
              {data.duration}
            </span>
          </div>

          <h2 className="mt-10 text-[30px] font-normal text-[#16191a]">
            Overview
          </h2>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.6] text-[#5a6b74]">
            {data.description}
          </p>

          <h2 className="mt-9 text-[30px] font-normal text-[#16191a]">
            Highlights
          </h2>
          <p className="mt-3 max-w-[640px] text-[17px] leading-[1.6] text-[#5a6b74]">
            {data.description}
          </p>

          <ul className="mt-9 grid max-w-[720px] gap-x-8 gap-y-4 sm:grid-cols-2">
            {HIGHLIGHT_BULLETS.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2 text-[17px] text-[#3d4b52]"
              >
                <Check
                  className="size-4 shrink-0 text-[#35a063]"
                  strokeWidth={2.5}
                  aria-hidden
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Booking card */}
            <BookingCard data={data}></BookingCard>
      </div>
    </div>
  );
}
