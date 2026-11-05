'use client';
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destination" },
  { label: "Add Destination", href: '/add-destination' },
  { label: "My Bookings", href: "#bookings" },
];

export default function Navbar() {
  const { data: session } = authClient.useSession()

  const user = session?.user

  const handleSignOut = () => {
    authClient.signOut()
  }

  return (
    <header className="font-display absolute left-2 right-2 top-2 z-10">
      <nav className="relative flex h-[66px] items-center justify-between bg-white pl-9 pr-10">
        {/* Left links */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-[17px] transition-colors hover:text-[#3f9fc0] ${link.active ? "text-[#3f9fc0]" : "text-[#1c1c1c]"
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile logo */}
        <Link href="/" className="mr-auto sm:hidden">
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={140}
            height={21}
            priority
          />
        </Link>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 hidden -translate-x-1/2 sm:block"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={170}
            height={25}
            priority
          />
        </Link>

        {/* Right links */}
        <div className="flex items-center gap-9 text-[17px] text-[#1c1c1c]">
          <Link
            href="#profile"
            className="flex items-center gap-1.5 transition-colors hover:text-[#3f9fc0]"
          >
            <UserRound className="size-[18px]" strokeWidth={1.8} />
            Profile
          </Link>


          {
            user ?
              <Popover>
                <PopoverTrigger render={
                  <Avatar>
                    <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>}>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>{user?.name}</PopoverTitle>
                    <PopoverDescription>
                      <p>{user?.email}</p>
                      <Button variant={'destructive'} className={'mt-3'} onClick={handleSignOut}>SignOut</Button>
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover> : <>

                <Link
                  href="/login"
                  className="transition-colors hover:text-[#3f9fc0]"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="transition-colors hover:text-[#3f9fc0]"
                >
                  Sign Up
                </Link>

              </>
          }





        </div>
      </nav>
    </header>
  );
}
