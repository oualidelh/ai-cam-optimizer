import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const AnalysesButton = () => {
  return (
    <div>
      <Button className="w-48 h-10 cursor-pointer">
        <span>Start Analyses</span>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default AnalysesButton;
