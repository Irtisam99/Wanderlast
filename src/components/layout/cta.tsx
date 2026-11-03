import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="font-display relative isolate flex flex-col items-center justify-center overflow-hidden bg-[#0b1a20] py-[130px] text-center text-white">
      <Image
        src="/images/CTA.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative px-4">
        <h2 className="text-5xl font-light leading-[1.1] sm:text-6xl md:text-[64px]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-5 text-[21px] text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <div className="mt-12 flex justify-center">
          <a
            href="#book"
            className="inline-flex h-[62px] items-center gap-10 bg-white px-8 text-[16px] font-medium tracking-[0.02em] text-[#1c2b31] transition-colors hover:bg-[#eef3f4]"
          >
            BOOK YOUR TRIP TODAY
            <ArrowRight className="size-[22px]" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
