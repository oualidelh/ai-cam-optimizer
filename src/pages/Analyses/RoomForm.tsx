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

type RoomFormProps = {
  setAnalyses: React.Dispatch<React.SetStateAction<AnalysesBtn>>;
};

const formSchema = z.object({
  roomWidth: z.number().min(1),
  roomLength: z.number().min(1).min(1),
  roomHeight: z.number().min(1).min(1),
});

const RoomForm = ({ setAnalyses }: RoomFormProps) => {
  const { roomDetails, setRoomDetails } = useAnalysesStore();
  console.log("roomDetails", roomDetails);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      setRoomDetails(values);

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );

      setAnalyses((prev) => ({
        ...prev,
        isRoom: true,
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
        className="flex flex-col space-y-8 max-w-3xl mx-auto py-10"
      >
        <div className="grid md:grid-cols-3 grid-cols-1 justify-between space-y-5 gap-3 w-full">
          <div className="col-span-1">
            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
        <Button
          disabled={!form.formState.isValid}
          className="self-end cursor-pointer"
          type="submit"
        >
          Done
        </Button>
      </form>
    </Form>
  );
};

export default RoomForm;
