import InfoCard from "@/components/InfoCard";
import { Camera, Shield, Zap } from "lucide-react";

const Highlights = () => {
  const features: feature[] = [
    {
      logo: Camera,
      title: "Smart Placement",
      content:
        "AI-powered camera positioning for maximum coverage with minimum equipment.",
    },
    {
      logo: Zap,
      title: "Cost Efficient",
      content:
        "Optimize your security budget with data-driven installation recommendations.",
    },
    {
      logo: Shield,
      title: "Professional Grade",
      content:
        "Industry-standard analysis trusted by security professionals worldwide.",
    },
  ];
  return (
    <main className="flex flex-col bg-secondary items-center justify-center px-3 py-5 mt-5 md:mt-1 gap-8 h-full">
      <div className="text-center space-y-4">
        <h1 className=" font-bold text-4xl text-foreground ">
          Why Choose CamOptimizer?
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Professional security camera installers trust our AI-powered analysis
          to deliver optimal coverage solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <InfoCard key={index} feature={feature} />
        ))}
      </div>
    </main>
  );
};

export default Highlights;
