import { useState } from "react";
import InputSetup from "./Inputs";
import ResultPage from "./ResultPage";
import { useAnalysesStore } from "@/store/ZustandStore";

const Analyses = () => {
  const [isResults, setIsResults] = useState(false);
  const { roomDetails, cameraDetails } = useAnalysesStore();

  const handleAnalyses = () => {
    console.log(
      "roomDetails",
      roomDetails,
      "isResults",
      isResults,
      "cameraDetails",
      cameraDetails
    );
    setIsResults(true);
  };

  return (
    <main className="min-h-[100vh] pt-16">
      <InputSetup onClick={handleAnalyses} />
      <ResultPage />
    </main>
  );
};

export default Analyses;
