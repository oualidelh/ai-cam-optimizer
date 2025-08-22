import { useAnalysesStore } from "@/store/ZustandStore";
import { useFormContext } from "react-hook-form";
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

type RoomFormProps = {
  setAnalyses: React.Dispatch<React.SetStateAction<AnalysesBtn>>;
  analyses: AnalysesBtn;
};

const RoomForm = ({ analyses }: RoomFormProps) => {
  const { roomDetails } = useAnalysesStore();
  const { control } = useFormContext();
  console.log("roomDetails", roomDetails);

  return (
    <div>
      {analyses.isRoom ? (
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
                Room Demensions Has Been Added Successfuly
              </span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col space-y-8 max-w-3xl mx-auto py-10">
          <div className="grid md:grid-cols-3 grid-cols-1 justify-between space-y-5 gap-3 w-full">
            <div className="col-span-1">
              <FormField
                control={control}
                name="roomWidth"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Width (meters)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="20"
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
                name="roomLength"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Length (meters)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="30"
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
                name="roomHeight"
                render={({ field }) => (
                  <FormItem className="gap-y-3">
                    <FormLabel className="pl-1">Height (meters)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5"
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
        </div>
      )}
    </div>
  );
};

export default RoomForm;
