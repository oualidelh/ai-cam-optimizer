import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Cctv, ListCollapse, Ruler, Warehouse } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import RoomForm from "./RoomForm";
import CameraForm from "./CameraForm";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnalysesStore } from "@/store/ZustandStore";
import { v4 as uuidv4 } from "uuid";

interface InputSetupProps {
  onClick: () => void;
}

const InputSetup = ({ onClick }: InputSetupProps) => {
  const [analyses, setAnalyses] = useState<AnalysesBtn>({
    isRoom: false,
    isCamera: false,
  });
  const { setRoomDetails, setCamerasCharc, camerasCharc } = useAnalysesStore();

  console.log("camerasCharc", camerasCharc);

  const formSchema = z.object({
    doriIdentify: z.number(),
    doriRecognize: z.number(),
    doriObserve: z.number(),
    doriDetect: z.number(),
    horizontalFOV: z.number(),
    tiltRange: z.number().min(1).max(260),
    verticalFOV: z.number(),
    roomWidth: z.number().min(1),
    roomLength: z.number().min(1).min(1),
    roomHeight: z.number().min(1).min(1),
  });

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  console.log("isValid", methods.formState.isValid);
  console.log("form vamlues", methods.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      setRoomDetails(values);
      const camId = uuidv4();
      setCamerasCharc((prev) => {
        return [
          ...prev,
          {
            id: camId,
            cameraDORI: [
              {
                id: `${camId}-0`,
                name: "identify",
                pixelatedImg: "/src/assets/id-pixel.png",
                layerThickness: values.doriIdentify,
                color: "rgba(9, 153, 6, 0.5)",
              },
              {
                id: `${camId}-1`,
                name: "recognize",
                pixelatedImg: "/src/assets/re-pixel.png",
                layerThickness: values.doriRecognize,
                color: "rgba(64, 158, 210, 0.4)",
              },
              {
                id: `${camId}-2`,
                name: "observe",
                pixelatedImg: "/src/assets/ob-pixel.png",
                layerThickness: values.doriObserve,
                color: "rgba(49, 118, 159, 0.4)",
              },
              {
                id: `${camId}-3`,
                name: "detect",
                pixelatedImg: "/src/assets/de-pixel.png",
                layerThickness: values.doriDetect,
                color: "rgba(213, 213, 213, 0.2)",
              },
            ],
            horizontalFOV: values.horizontalFOV,
            tiltRange: values.tiltRange,
            camRotation: 360,
            verticalFOV: values.verticalFOV,
            camPosition: {
              x: 2,
              y: 2,
            },
          },
        ];
      });

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                    <RoomForm setAnalyses={setAnalyses} analyses={analyses} />
                  </TabsContent>
                  <TabsContent className="space-y-4" value="camera">
                    <CardHeader className="px-0">
                      <CardTitle className="flex items-center gap-2 my-3">
                        <ListCollapse className="h-5 w-5 text-primary" />
                        Camera Details
                      </CardTitle>
                    </CardHeader>

                    <CameraForm setAnalyses={setAnalyses} analyses={analyses} />
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
                    disabled={!methods.formState.isValid}
                    onClick={onClick}
                    className="w-48 h-10 cursor-pointer"
                  >
                    <span>Start Analyses</span>
                    <ArrowRight />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default InputSetup;
