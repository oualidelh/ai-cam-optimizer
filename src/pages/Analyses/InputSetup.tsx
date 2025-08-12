import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Cctv, ListCollapse, Ruler, Warehouse } from "lucide-react";
import RoomForm from "./RoomForm";
import CameraForm from "./CameraForm";
import { useState } from "react";

interface InputSetupProps {
  onClick: () => void;
}

const InputSetup = ({ onClick }: InputSetupProps) => {
  const [Analyses, setAnalyses] = useState<AnalysesBtn>({
    isRoom: false,
    isCamera: false,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <section>
        <h1 className="text-3xl text-center md:text-4xl font-bold mb-4">
          Room Analysis Setup
        </h1>
        <p className="text-xl text-center mx-auto mb-8">
          Provide your room and cameras details for optimal camera placement
          analysis
        </p>
      </section>
      <section className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardContent className="p-8 ">
            <Tabs defaultValue="room" className="space-y-8 min-h-56">
              <TabsList className="w-full">
                <TabsTrigger value="room">
                  <Warehouse className="text-primary" />
                  Room
                </TabsTrigger>
                <TabsTrigger value="camera">
                  <Cctv className="text-primary" />
                  Camera
                </TabsTrigger>
              </TabsList>
              <TabsContent className="space-y-4" value="room">
                <CardHeader className="px-0">
                  <CardTitle className="flex items-center gap-2 my-3">
                    <Ruler className="h-5 w-5 text-primary" />
                    Room Dimensions
                  </CardTitle>
                </CardHeader>
                <RoomForm setAnalyses={setAnalyses} />
              </TabsContent>
              <TabsContent className="space-y-4" value="camera">
                <CardHeader className="px-0">
                  <CardTitle className="flex items-center gap-2 my-3">
                    <ListCollapse className="h-5 w-5 text-primary" />
                    Camera Details
                  </CardTitle>
                </CardHeader>

                <CameraForm setAnalyses={setAnalyses} />
              </TabsContent>
            </Tabs>
            <div className="flex justify-between mt-8 pt-6 border-t">
              <div className="text-sm text-muted-foreground">
                {/* {isFormValid() ? (
                  <span className="text-success">✓ Ready for analysis</span>
                ) : (
                  <span>Complete dimensions to continue</span>
                )} */}
              </div>
              <Button
                disabled={!(Analyses.isCamera && Analyses.isRoom)}
                onClick={onClick}
                className="w-48 h-10 cursor-pointer"
              >
                <span>Start Analyses</span>
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default InputSetup;
