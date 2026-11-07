"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
  "Beach",
  "Mountains",
  "City",
  "Cruise",
  "Adventure",
  "Cultural",
  "Honeymoon",
];

const emptyForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const inputClasses =
  "h-11 w-full rounded-md border-[#e3e9ed] bg-[#f4f7f9] text-[15px] text-[#132830] placeholder:text-[#94a3b8] focus-visible:border-[#3ea3c3] focus-visible:ring-2 focus-visible:ring-[#3ea3c3]/20 aria-invalid:border-[#e56572]";

export default function AddDestinationForm() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);

  const set = (field: keyof typeof emptyForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => setForm(emptyForm);

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire up to a real endpoint/service when available.

    const token=await getTokenFromClient()

    const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        authorization:`Bearer ${token}`
      },
      body:JSON.stringify(form)
    })
    const resultdata=await res.json()
    console.log(resultdata)
  };

  return (
    <Card className="mx-auto mt-[32px] w-full max-w-[650px] rounded-lg border-[#e8e8e8] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <CardContent className="px-8 py-5">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Destination Name */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="destination-name"
              className="text-[15px] font-semibold text-[#132830]"
            >
              Destination Name
            </Label>
            <Input
              id="destination-name"
              required
              placeholder="Bali Paradise"
              value={form.name}
              onChange={(event) => set("name", event.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Country / Category */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="destination-country"
                className="text-[15px] font-semibold text-[#132830]"
              >
                Country
              </Label>
              <Input
                id="destination-country"
                placeholder="Indonesia"
                value={form.country}
                onChange={(event) => set("country", event.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="destination-category"
                className="text-[15px] font-semibold text-[#132830]"
              >
                Category
              </Label>
              <Select
                required
                value={form.category || null}
                onValueChange={(value) => set("category", value ?? "")}
              >
                <SelectTrigger
                  id="destination-category"
                  className={`${inputClasses} data-placeholder:text-[#94a3b8]`}
                >
                  <SelectValue placeholder="Beach" />
                </SelectTrigger>
                <SelectContent className="border-[#e3e9ed] bg-white">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price / Duration */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="destination-price"
                className="text-[15px] font-semibold text-[#132830]"
              >
                Price (USD)
              </Label>
              <Input
                id="destination-price"
                type="number"
                min="0"
                required
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(event) => set("price", event.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="destination-duration"
                className="text-[15px] font-semibold text-[#132830]"
              >
                Duration
              </Label>
              <Input
                id="destination-duration"
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(event) => set("duration", event.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="destination-date"
              className="text-[15px] font-semibold text-[#132830]"
            >
              Departure Date
            </Label>
            <Input
              id="destination-date"
              type="date"
              required
              value={form.departureDate}
              onChange={(event) => set("departureDate", event.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="destination-image"
              className="text-[15px] font-semibold text-[#132830]"
            >
              Image URL
            </Label>
            <Input
              id="destination-image"
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(event) => set("imageUrl", event.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="destination-description"
              className="text-[15px] font-semibold text-[#132830]"
            >
              Description
            </Label>
            <Textarea
              id="destination-description"
              required
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={(event) => set("description", event.target.value)}
              className="min-h-[100px] rounded-md border-[#e3e9ed] bg-[#f4f7f9] text-[15px] text-[#132830] placeholder:text-[#94a3b8] focus-visible:border-[#3ea3c3] focus-visible:ring-2 focus-visible:ring-[#3ea3c3]/20"
            />
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              className="h-11 cursor-pointer gap-2 rounded-md border-[#f0b6ba] bg-white px-5 text-[15px] text-[#e56572] hover:bg-[#e56572]/10 hover:text-[#e56572]"
            >
              <Trash2 className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-11 cursor-pointer gap-2 rounded-md bg-[#3ea3c3] px-5 text-[15px] text-white hover:bg-[#3593b4]"
            >
              <Save className="size-4" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
