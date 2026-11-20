import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Subjects from "@/components/subjects";
import FeaturedCourses from "@/components/featured-courses";
import HowItWorks from "@/components/how-it-works";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Subjects />
        <FeaturedCourses />
        <HowItWorks />
      </main>
    </>
  );
}
