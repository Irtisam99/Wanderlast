import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "786 901 1622", href: "tel:+17869011622" },
      { label: "info@wandarland.com", href: "mailto:info@wandarland.com" },
    ],
  },
];

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="font-display bg-[#0c0c0c] pb-7 pt-[110px] text-white">
      <div className="mx-auto w-[90%] max-w-[1440px]">
        {/* Wordmark + tagline */}
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={524}
          height={77}
          className="h-auto w-[min(524px,70%)]"
        />
        <p className="mt-5 text-[19px] text-[#a6a6a6]">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-[64px] flex flex-col gap-12 lg:flex-row">
          {/* Newsletter */}
          <div className="w-full shrink-0 lg:w-[308px]">
            <h3 className="text-[17px] text-[#f2f2f2]">NEWSLETTER</h3>
            <p className="mt-3 text-[14px] text-[#8f8f8f]">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-5">
              <input
                type="email"
                placeholder="Enter email"
                aria-label="Email address"
                className="h-[46px] w-full bg-[#232323] pl-4 pr-11 text-[16px] text-white placeholder:text-[#909090] focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 top-0 flex h-[46px] w-11 cursor-pointer items-center justify-center text-white"
              >
                <ArrowUpRight className="size-[18px]" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 flex-1 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[17px] text-[#f2f2f2]">{column.title.toUpperCase()}</h3>
                <ul className="mt-7 flex flex-col gap-5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[18px] text-[#d6d6d6] transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-[#242424] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-[#9a9a9a]">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://x.com"
              aria-label="X"
              className="text-white transition-opacity hover:opacity-70"
            >
              <XIcon className="size-[21px]" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="text-white transition-opacity hover:opacity-70"
            >
              <LinkedinIcon className="size-[22px]" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-white transition-opacity hover:opacity-70"
            >
              <InstagramIcon className="size-[22px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
