import AnalysesButton from "@/components/AnalysesButton";
import { CheckCircle } from "lucide-react";

const Hero = () => {
  const benefits = [
    "Reduce blind spots by up to 85%",
    "Minimize camera count and costs",
    "Generate professional reports",
    "3D visualization and planning",
  ];
  return (
    <main className="flex flex-col lg:flex-row px-3 pt-3 gap-8 h-full">
      <div className="flex flex-col flex-1/2 gap-y-5">
        <h1 className="flex flex-wrap font-bold md:text-6xl text-4xl text-foreground ">
          Optimize Your{" "}
          <span className="text-primary bg-clip-text"> Security Camera </span>{" "}
          Placement
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Professional-grade AI analysis to find the perfect camera positions
          for maximum coverage, minimum cost, and zero blind spots.
        </p>
        <AnalysesButton />
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle
                size={24}
                color="green"
                className="h-5 w-5 flex-shrink-0"
              />
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex relative flex-1/2 group  items-center justify-center">
        <div className="w-full lg:h-[350px] h-full group-hover:rotate-0 rotate-3 transition-all duration-200 absolute rounded-3xl shrink  bg-primary/20" />
        <img
          className="w-full lg:h-[350px] h-full rounded-3xl shadow-lg  group-hover:shadow-2xl transition-all duration-300 shrink z-10 object-cover"
          src="public/hero-image.jpg"
          alt="hero-image"
        />
      </div>
    </main>
  );
};

export default Hero;
