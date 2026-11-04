'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";


const DeleteDestinationDialogue = (
    {id} :{id:string}
) => {

    const handleDeleteDestination=async()=>{
        const res=await fetch(`http://localhost:8000/destination/${id}`,
            {
                method:"DELETE",
            })
        const data=await res.json()
        redirect('/destination')
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={

                    <Button
                        variant="outline"
                        className="h-11 cursor-pointer gap-2 rounded-md border-[#e56572] bg-white px-5 text-[15px] text-[#e56572] hover:bg-[#e56572]/10 hover:text-[#e56572]"
                    >
                        <Trash2 className="size-4" />
                        Delete
                    </Button>
                } />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteDestinationDialogue;