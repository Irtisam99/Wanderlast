import Banner from "@/components/layout/banner";
import Cta from "@/components/layout/cta";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Testimonials from "@/components/layout/testimonials";
import WhyChooseUs from "@/components/layout/why-choose-us";

export default function Home() {
  return (
    <>
      <main className="relative">
        <Banner />
        <Navbar />
        <WhyChooseUs />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
