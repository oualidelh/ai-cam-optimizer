import { useAnalysesStore } from "@/store/ZustandStore";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type CaemraFormProps = {
  setAnalyses: React.Dispatch<React.SetStateAction<AnalysesBtn>>;
  analyses: AnalysesBtn;
};

const CameraForm = ({
  //  setAnalyses,
  analyses,
}: CaemraFormProps) => {
  const { camerasCharc, setCamerasCharc } = useAnalysesStore();
  const { control, formState, getValues, trigger } = useFormContext();
  // const [isDisabled, setIsDisabled] = useState(true);

  console.log(camerasCharc);
  console.log("control._formState", formState.isValid);

  // const checkDisabled = useCallback(async () => {}, [trigger]);

  const addAnotherCam = async () => {
    const isValid = await trigger([
      "doriIdentify",
      "doriRecognize",
      "doriObserve",
      "doriDetect",
      "horizontalFOV",
      "tiltRange",
    ]);

    console.log("isValid", isValid);
    if (!isValid) return;
    // setAnalyses((prev) => ({
    //   ...prev,
    //   isCamera: true,
    // }));

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
              startRadius: 0,
              layerThickness: getValues("doriIdentify"),
              color: "rgba(9, 153, 6, 0.5)",
            },
            {
              id: `${camId}-1`,
              name: "recognize",
              pixelatedImg: "/src/assets/re-pixel.png",
              startRadius: getValues("doriIdentify"),
              layerThickness: getValues("doriRecognize"),
              color: "rgba(64, 158, 210, 0.4)",
            },
            {
              id: `${camId}-2`,
              name: "observe",
              pixelatedImg: "/src/assets/ob-pixel.png",
              startRadius: getValues("doriRecognize"),
              layerThickness: getValues("doriObserve"),
              color: "rgba(49, 118, 159, 0.4)",
            },
            {
              id: `${camId}-3`,
              name: "detect",
              pixelatedImg: "/src/assets/de-pixel.png",
              startRadius: getValues("doriObserve"),
              layerThickness: getValues("doriDetect"),
              color: "rgba(213, 213, 213, 0.2)",
            },
          ],
          horizontalFOV: getValues("horizontalFOV"),
          tiltRange: getValues("tiltRange"),
        },
      ];
    });

    control._reset();
  };

  return (
    <div>
      {analyses.isCamera ? (
        <Card>
          <CardContent className="flex flex-col py-4 gap-y-4">
            <CardHeader>
              <CardTitle>SUCCESS</CardTitle>
            </CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle
                size={24}
                color="green"
                className="h-5 w-5 flex-shrink-0"
              />
              <span className="text-muted-foreground">
                Cameras Details Has Been Added Successfuly
              </span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-10 max-w-3xl mx-auto py-10 flex flex-col">
          <div className="grid md:grid-cols-3 grid-cols-1 justify-between space-y-5 gap-3 w-full">
            <div className="col-span-1">
              <FormField
                control={control}
                name="doriIdentify"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Identify (m)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5.6"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1">
              <FormField
                control={control}
                name="doriRecognize"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Recognize (m)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="11.2"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={control}
                name="doriObserve"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Observe (m)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="22.4"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={control}
                name="doriDetect"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Detect (m)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="56.0"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={control}
                name="horizontalFOV"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">
                      horizontalFOV (degree)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="102"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={control}
                name="tiltRange"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">tiltRange (degree)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="78"
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val === "" ? "" : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-3 self-end">
            <Button
              className=" cursor-pointer"
              onClick={addAnotherCam}
              type="button"
            >
              add camera +
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraForm;
