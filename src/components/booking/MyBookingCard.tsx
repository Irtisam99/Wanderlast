'use client';
import { CalendarDays, CheckCircle2, Eye, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Router } from "next/router";
import { redirect } from "next/navigation";

type Booking = {
    _id: { $oid: string };
    name: string;
    price: string;
    departureDate: string;
    imageUrl: string;
    status?: string;
};

// status is not part of the booking schema yet — existing docs fall back to
// "Pending"; swap the real value in once the backend stores it.
const STATUS_STYLES: Record<string, { chip: string; dot: string }> = {
    Confirmed: {
        chip: "bg-[#e7f5ec] text-[#2e8b4f]",
        dot: "text-[#2e8b4f]",
    },
    Pending: {
        chip: "bg-[#fdf3e3] text-[#c08a1e]",
        dot: "text-[#c08a1e]",
    },
};

const MyBookingCard = ({ booking }: { booking: Booking }) => {
    const status = booking.status || "Pending";
    const styles = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;

    const departure = booking.departureDate
        ? new Date(booking.departureDate).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
          })
        : "";

    console.log(booking)
    const handleCancelBooking=async()=>{
        const res=await fetch(`http://localhost:8000/my-bookings/${booking._id}`,{
            method:"DELETE"
        })
        const data=await res.json()
        console.log(data)
        redirect('/my-bookings')
    }
    return (
        <div className="flex flex-col gap-5 rounded-md border border-[#e8e8e8] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:gap-6">
            {/* Destination photo */}
            <div className="relative h-[130px] w-full shrink-0 overflow-hidden bg-[#eef4f6] sm:h-[120px] sm:w-[235px]">
                <img
                    src={booking.imageUrl}
                    alt={booking.name}
                    className="size-full object-cover"
                />
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
                <span
                    className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${styles.chip}`}
                >
                    <CheckCircle2
                        className={`size-3.5 ${styles.dot}`}
                        strokeWidth={2.2}
                        aria-hidden
                    />
                    {status}
                </span>

                <h3 className="mt-2 text-[26px] leading-tight text-[#16191a]">
                    {booking.name}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-[15px] text-[#33424b]">
                    <CalendarDays
                        className="size-4 shrink-0 text-[#5a6b74]"
                        strokeWidth={1.8}
                    />
                    Departure: {departure}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-[15px] text-[#33424b]">
                    <MapPin
                        className="size-4 shrink-0 text-[#5a6b74]"
                        strokeWidth={1.8}
                    />
                    Booking ID: {booking._id.$oid}
                </p>

                <p className="mt-3 text-[28px] font-semibold text-[#3ea3c3]">
                    ${Number(booking.price || 0).toLocaleString("en-US")}
                </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-3 sm:flex-col lg:flex-row">
                <Button
                    onClick={handleCancelBooking}
                    variant="outline"
                    className="h-10 cursor-pointer gap-2 rounded-md border-[#e56572] bg-white px-5 text-[15px] text-[#e56572] hover:bg-[#e56572]/10 hover:text-[#e56572]"
                >
                    <Trash2 className="size-4" />
                    Cancel
                </Button>
                <Button className="h-10 cursor-pointer gap-2 rounded-md bg-[#4a93b3] px-6 text-[15px] text-white hover:bg-[#3f86a4]">
                    <Eye className="size-4" />
                    View
                </Button>
            </div>
        </div>
    );
};

export default MyBookingCard;
