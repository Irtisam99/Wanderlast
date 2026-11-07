"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const categories = [
    "Beach",
    "Mountains",
    "City",
    "Cruise",
    "Adventure",
    "Cultural",
    "Honeymoon",
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

// const emptyForm = {
//     name: "",
//     country: "",
//     category: "",
//     price: "",
//     duration: "",
//     departureDate: "",
//     imageUrl: "",
//     description: "",
// };

const inputClasses =
    "h-11 w-full rounded-md border-[#e3e9ed] bg-[#f4f7f9] text-[15px] text-[#132830] placeholder:text-[#94a3b8] focus-visible:border-[#3ea3c3] focus-visible:ring-2 focus-visible:ring-[#3ea3c3]/20 aria-invalid:border-[#e56572]";


const EditDestinationDialog = ({
    id,
    datas,
}: {
    id: string;
    datas: Destination;
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(datas);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const set = (field: keyof typeof form, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const reset = () => setForm(datas);

    // Re-seed the form from the latest server data every time the dialog
    // opens, so a re-edit after a refresh never shows stale values.
    const handleOpenChange = (nextOpen: boolean) => {
        setError(null);
        if (nextOpen) {
            reset();
        }
        setOpen(nextOpen);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        setError(null);
        try {
            // Send only the editable fields — Mongo internals like `_id`
            // must never reach `updateOne` ("cannot modify immutable _id").
            const updateData: Destination = {
                name: form.name,
                country: form.country,
                category: form.category,
                price: form.price,
                duration: form.duration,
                departureDate: form.departureDate,
                imageUrl: form.imageUrl,
                description: form.description,
            };

            const token=await getTokenFromClient()
            // TODO: wire up to a real endpoint/service when available.
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization:`Bearer ${token}`
                },
                body: JSON.stringify(updateData),
            });
            if (!res.ok) {
                setError(`Failed to save (HTTP ${res.status}). Try again.`);
                return;
            }
            setOpen(false);
            // Re-run the server component so the page re-fetches and
            // re-renders with the updated destination data.
            router.refresh();
        } catch {
            setError("Failed to save. Check your connection and try again.");
        } finally {
            setSaving(false);
        }
    };


    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        className="h-11 cursor-pointer gap-2 rounded-md border-[#dcdcdc] bg-white px-5 text-[15px] text-[#1d2b32] hover:bg-[#f6f8f9] hover:text-[#1d2b32]"
                    >
                        <PenLine className="size-4" />
                        Edit
                    </Button>
                }
            />
            <DialogContent className={'min-w-xl'}>
                <DialogHeader>
                    <DialogTitle className={'mt-3'}>Edit Destination</DialogTitle>
                    <DialogDescription className="sr-only">
                        Update the travel package details.
                    </DialogDescription>
                    <form className="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
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
                        {error && (
                            <p
                                role="alert"
                                className="text-[14px] text-[#e56572]"
                            >
                                {error}
                            </p>
                        )}
                        <div className="mt-4 flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={reset}
                                disabled={saving}
                                className="h-11 cursor-pointer gap-2 rounded-md border-[#f0b6ba] bg-white px-5 text-[15px] text-[#e56572] hover:bg-[#e56572]/10 hover:text-[#e56572]"
                            >
                                <Trash2 className="size-4" />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="h-11 cursor-pointer gap-2 rounded-md bg-[#3ea3c3] px-5 text-[15px] text-white hover:bg-[#3593b4]"
                            >
                                <Save className="size-4" />
                                {saving
                                    ? "Saving..."
                                    : "Edit Travel Package"}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default EditDestinationDialog;