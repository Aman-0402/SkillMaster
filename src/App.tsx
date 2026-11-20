import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Subjects from "@/components/subjects";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Subjects />
      </main>
    </>
  );
}
