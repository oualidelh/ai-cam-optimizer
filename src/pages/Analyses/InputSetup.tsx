import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateDORI } from "@/lib/calculateDORI";
import { Cctv, Warehouse } from "lucide-react";

interface InputSetupProps {
  setRoomDetails: React.Dispatch<React.SetStateAction<RoomDetails>>;
  roomDetails: RoomDetails;
}

const dori = calculateDORI(2.8, 2688, "1/3");
console.log(dori);

const InputSetup = ({ roomDetails, setRoomDetails }: InputSetupProps) => {
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
          <CardContent className="p-8">
            <Tabs defaultValue="room" className="space-y-8">
              <TabsList className="w-full">
                <TabsTrigger value="room">
                  <Warehouse />
                  Room
                </TabsTrigger>
                <TabsTrigger value="camera">
                  <Cctv />
                  Camera
                </TabsTrigger>
              </TabsList>
              <TabsContent value="room">
                <div className="flex flex-col lg:flex-row justify-between  gap-3 w-full ">
                  <Label className="flex flex-col items-start w-full gap-y-4">
                    Width(meters)
                    <Input
                      id="width"
                      type="number"
                      placeholder="20"
                      required
                      value={roomDetails.width}
                      onChange={(e) =>
                        setRoomDetails((prev) => ({
                          ...prev,
                          width: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </Label>
                  <Label className="flex flex-col items-start w-full gap-y-4">
                    Length(meters)
                    <Input
                      id="height"
                      type="number"
                      placeholder="20"
                      required
                      value={roomDetails.length}
                      onChange={(e) =>
                        setRoomDetails((prev) => ({
                          ...prev,
                          length: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </Label>
                  <Label className="flex flex-col items-start w-full gap-y-4">
                    Height(meters)
                    <Input
                      id="height"
                      type="number"
                      placeholder="20"
                      required
                      value={roomDetails.height}
                      onChange={(e) =>
                        setRoomDetails((prev) => ({
                          ...prev,
                          height: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </Label>
                </div>
              </TabsContent>
              <TabsContent value="camera"></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default InputSetup;
