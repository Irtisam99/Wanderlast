import FeaturedCarousel, {
  type FeaturedDestination,
} from "@/components/layout/featured-carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Featured = async () => {
  let destinations: FeaturedDestination[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`, {
      cache: "no-store",
    });
    destinations = (await res.json()) as FeaturedDestination[];
  } catch {
    destinations = [];
  }
  if (!destinations.length) return null;

  return (
    <section className="font-display mt-20 pb-24">
      {/* Heading row */}
      <div className="mx-auto flex w-[90%] max-w-[1440px] flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl leading-[1.05] text-[#16191a] md:text-[56px]">
            Featured Destinations
          </h2>
          <p className="mt-2 text-[15px] text-[#5a6b74]">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>
        <Link
          href="/destination"
          className="flex h-12 items-center gap-12 rounded-[2px] border border-[#3ea3c3]/60 bg-white px-6 text-[13px] tracking-[0.08em] text-[#2f7f9b] uppercase transition-colors hover:border-[#3ea3c3] hover:bg-[#3ea3c3] hover:text-white"
        >
          All Destinations
          <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
        </Link>
      </div>

      <FeaturedCarousel destinations={destinations} />
    </section>
  );
};

export default Featured;
