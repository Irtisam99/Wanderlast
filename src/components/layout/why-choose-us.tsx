import { Headphones, Map, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="font-display bg-[#dff4fa] pb-[120px] pt-[110px]">
      <div className="mx-auto w-[90%] max-w-[1440px] text-center">
        <h2 className="text-4xl font-normal text-[#16191a] sm:text-5xl md:text-[62px] md:leading-[1.1]">
          Why Choose Wanderlust
        </h2>
        <p className="mt-4 text-[19px] text-[#6b7b84]">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="shadow-sm bg-white p-12 text-left"
            >
              <feature.icon
                className="size-12 text-[#3e9fc0]"
                strokeWidth={2}
                aria-hidden
              />
              <h3 className="mt-7 text-[30px] font-normal text-[#132830]">
                {feature.title}
              </h3>
              <p className="mt-6 max-w-[400px] text-[17px] leading-[1.6] text-[#4f6069]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
