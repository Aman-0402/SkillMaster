import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Subjects from "@/components/subjects";
import FeaturedCourses from "@/components/featured-courses";
import HowItWorks from "@/components/how-it-works";
import CtaBanner from "@/components/cta-banner";
import Footer from "@/components/footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Subjects />
        <FeaturedCourses />
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
