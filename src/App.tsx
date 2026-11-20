import Navbar from "@/components/navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-site px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight">SkillMaster</h1>
        <p className="mt-3 text-slate-600">Scroll to test the navbar. Hover About to open its menu.</p>
        <div className="h-[200vh]" />
      </main>
    </>
  );
}
