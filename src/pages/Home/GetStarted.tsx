import AnalysesButton from "@/components/AnalysesButton";

const GetStarted = () => {
  return (
    <main className="h-auto flex items-center justify-center py-12 px-6">
      <div className="flex flex-col bg-gradient-to-r from-primary/90 to-primary items-center p-8 md:p-12 px-4 text-white w-full rounded-3xl">
        <h1 className="text-3xl text-center md:text-4xl font-bold mb-4">
          Ready to Optimize Your Security Setup?
        </h1>
        <p className="text-xl text-center mx-auto mb-8">
          Get professional camera placement analysis in minutes. Start your free
          analysis now.
        </p>
        <AnalysesButton variant="secondary" />
      </div>
    </main>
  );
};

export default GetStarted;
