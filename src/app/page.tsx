import Banner from "@/components/layout/banner";
import Cta from "@/components/layout/cta";
import Featured from "@/components/layout/featured";
import Testimonials from "@/components/layout/testimonials";
import WhyChooseUs from "@/components/layout/why-choose-us";

export default function Home() {
  return (
    <>
      <Banner />
      <Featured></Featured>
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </>
  );
}
