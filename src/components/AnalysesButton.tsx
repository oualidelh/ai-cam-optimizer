import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
interface btnAnalysesProps {
  variant:
    | "default"
    | "link"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | null
    | undefined;
}

const AnalysesButton = ({ variant }: btnAnalysesProps) => {
  return (
    <div>
      <Button variant={variant} className="w-48 h-10 cursor-pointer">
        <span>Start Analyses</span>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default AnalysesButton;
