import MyBookingCard from "@/components/booking/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Booking = {
    _id: { $oid: string };
    name: string;
    price: string;
    departureDate: string;
    imageUrl: string;
    status?: string;
};

const MyBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    let bookings: Booking[] = [];
    try {
        const res = await fetch(
            `http://localhost:8000/my-bookings/${user?.email}`,
            { cache: "no-store" },
        );
        bookings = (await res.json()) as Booking[];
    } catch {
        bookings = [];
    }

    return (
        <div className="font-display mx-auto w-[90%] max-w-[1440px] pb-24">
            <h1 className="text-5xl leading-[1.1] text-[#16191a]">
                My Bookings
            </h1>
            <p className="mt-2 text-[15px] text-[#5a6b74]">
                Manage and view your upcoming travel plans
            </p>

            {bookings.length ? (
                <div className="mt-8 flex flex-col gap-5">
                    {bookings.map((booking) => (
                        <MyBookingCard
                            key={booking._id.$oid}
                            booking={booking}
                        />
                    ))}
                </div>
            ) : (
                <p className="mt-10 text-[17px] text-[#5a6b74]">
                    No bookings yet. Browse destinations and book your first
                    trip!
                </p>
            )}
        </div>
    );
};

export default MyBookingsPage;
