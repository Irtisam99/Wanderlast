'use client';
import { ArrowRight, Check } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "../ui/input";

const BOOKING_BENEFITS = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];
const BookingCard = ({ data }) => {

    const { data: session } = authClient.useSession();
    const user = session?.user

    const handleBooking=async(e)=>{
        e.preventDefault();

        const departureDate=e.target.departureDate.value
        const mainData={
            username:user?.name,
            email:user?.email,
            image:user?.image,
            ...data,
            departureDate:departureDate,
            bookingDate:new Date()
        }
    
        const res=await fetch('http://localhost:8000/booking',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
                
            },
            body:JSON.stringify(mainData)
        })

        const dataReceived=await res.json()
        console.log(dataReceived)
    }

    return (
        <aside className="h-fit rounded-md border border-[#e8e8e8] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <p className="text-[16px] text-[#4f6069]">Starting from</p>
            <p className="mt-1 text-[36px] font-semibold text-[#3ea3c3]">
                ${Number(data.price || 0).toLocaleString("en-US")}
            </p>
            <p className="text-[15px] text-[#4f6069]">per person</p>

            <form onSubmit={handleBooking}>
                <Input
                    type="date"
                    name='departureDate'
                    defaultValue={data.departureDate}
                    className="mt-7 flex h-11 items-center rounded-md border border-[#e3e9ed] bg-[#f4f7f9] px-4 text-[15px] text-[#1d2b32]">
                </Input>

                <Button type='submit' className="mt-5 h-12 w-full cursor-pointer gap-2 rounded-md bg-[#4aa3bd] text-[16px] text-white hover:bg-[#3f95b0]">
                    Book Now
                    <ArrowRight className="size-[18px]" strokeWidth={2} />
                </Button>
            </form>
            <ul className="mt-6 space-y-3">
                {BOOKING_BENEFITS.map((benefit) => (
                    <li
                        key={benefit}
                        className="flex items-center gap-2 text-[15px] text-[#3d4b52]"
                    >
                        <Check
                            className="size-4 shrink-0 text-[#3ea3c3]"
                            strokeWidth={2.5}
                            aria-hidden
                        />
                        {benefit}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default BookingCard;