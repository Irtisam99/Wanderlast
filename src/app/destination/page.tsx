import BrowseDestinations, {
  type Destination,
} from "@/components/destinations/browse-destinations";

type ApiResponse = Destination & { _id?: string | { $oid?: string } };

export default async function AllDestinationsPage() {
  let destinations: Destination[] = [];
  try {
    const res = await fetch("http://localhost:8000/destination", {
      cache: "no-store",
    });
    const data = (await res.json()) as ApiResponse[] | { destinations?: ApiResponse[] } | unknown;
    const list = Array.isArray(data) ? data : ((data as { destinations?: ApiResponse[] })?.destinations ?? []);
    destinations = list.map(
      ({ _id, ...rest }: ApiResponse, index: number) => ({
        ...rest,
        id:
          typeof _id === "string"
            ? _id
            : typeof _id === "object" && _id !== null && "$oid" in _id
              ? _id.$oid
              : `${rest.name}-${index}`,
      }),
    );
  } catch (error) {
    console.error("Failed to load destinations:", error);
  }

  return (
    <div className="font-display mx-auto w-[90%] max-w-[1440px] pb-24">
      <h1 className="text-4xl font-normal text-[#16191a] md:text-[46px] md:leading-[1.15]">
        Explore All Destinations
      </h1>
      <p className="mt-4 text-[18px] text-[#6b7b84]">
        Find your perfect travel experience from our curated collection
      </p>

      <BrowseDestinations destinations={destinations} />
    </div>
  );
}
