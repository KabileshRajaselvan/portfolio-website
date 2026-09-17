import Hero from "@/components/Hero";
import TickerMarquee from "@/components/TickerMarquee";
import SelectedWork from "@/components/SelectedWork";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mt-20 sm:mt-28">
        <TickerMarquee />
      </div>
      <div className="mt-20 sm:mt-32 lg:mt-40">
        <SelectedWork />
      </div>
      <div className="mt-32 sm:mt-48 lg:mt-56">
        <Experience />
      </div>
      <div className="mt-32 sm:mt-48 lg:mt-56">
        <Skills />
      </div>
      <div className="mt-32 sm:mt-48 lg:mt-56">
        <Education />
      </div>
      <div className="mt-32 sm:mt-48 lg:mt-56">
        <Contact />
      </div>
    </>
  );
}
