import Banner from "@/components/layout/banner";
import Cta from "@/components/layout/cta";
import Testimonials from "@/components/layout/testimonials";
import WhyChooseUs from "@/components/layout/why-choose-us";

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </>
  );
}
