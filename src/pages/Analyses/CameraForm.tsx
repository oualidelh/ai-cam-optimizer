import { useAnalysesStore } from "@/store/ZustandStore";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CaemraFormProps = {
  setAnalyses: React.Dispatch<React.SetStateAction<AnalysesBtn>>;
};

const formSchema = z.object({
  doriIdentify: z.number(),
  doriRecognize: z.number(),
  doriObserve: z.number(),
  doriDetect: z.number(),
  horizontalFOV: z.number(),
  tiltRange: z.number().min(1).max(260),
});

const CameraForm = ({ setAnalyses }: CaemraFormProps) => {
  const { camerasCharc, setCamerasCharc } = useAnalysesStore();
  console.log(camerasCharc);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  console.log("isValid", form.formState.isValid);
  console.log("form vamlues", form.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      setCamerasCharc((prev) => {
        return [
          ...prev,
          {
            cameraDORI: [
              {
                startRadius: 0,
                layerThickness: values.doriIdentify,
                color: "rgba(9, 153, 6, 0.5)",
              },
              {
                startRadius: values.doriIdentify,
                layerThickness: values.doriRecognize,
                color: "rgba(64, 158, 210, 0.4)",
              },
              {
                startRadius: values.doriRecognize,
                layerThickness: values.doriObserve,
                color: "rgba(49, 118, 159, 0.4)",
              },
              {
                startRadius: values.doriObserve,
                layerThickness: values.doriDetect,
                color: "rgba(213, 213, 213, 0.2)",
              },
            ],
            horizontalFOV: values.horizontalFOV,
            tiltRange: values.tiltRange,
          },
        ];
      });

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
      setAnalyses((prev) => ({
        ...prev,
        isCamera: true,
      }));
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 max-w-3xl mx-auto py-10 flex flex-col"
      >
        <div className="grid md:grid-cols-3 grid-cols-1 justify-between space-y-5 gap-3 w-full">
          <div className="col-span-1">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
              control={form.control}
              name="horizontalFOV"
              render={({ field }) => (
                <FormItem className="gap-y-3">
                  <FormLabel className="pl-1">horizontalFOV (degree)</FormLabel>
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
              control={form.control}
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
        <Button
          disabled={!form.formState.isValid}
          className="self-end cursor-pointer"
          type="submit"
        >
          add camera +
        </Button>
      </form>
    </Form>
  );
};

export default CameraForm;
