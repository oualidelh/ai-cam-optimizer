import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Konva from "./Konva";
import Cameras from "./Cameras";
import { useState } from "react";
import { useAnalysesStore } from "@/store/ZustandStore";
// import { useAnalysesStore } from "@/store/ZustandStore";

// interface ResultPageProps {
//   cameraDetails: CameraDetails;
//   roomDetails: RoomDetails;
// }

const ResultPage = () => {
  const { camerasCharc } = useAnalysesStore();
  const [idsDORI, setIdsDORI] = useState<string[]>([
    camerasCharc[camerasCharc.length && camerasCharc.length - 1]?.cameraDORI[0]
      .id,
  ]);

  console.log(
    "camerasChar FIRST item dori",
    camerasCharc[camerasCharc.length && camerasCharc.length - 1]?.cameraDORI[0]
      .id
  );
  console.log("idsdori", idsDORI);

  const DORIClicked = (
    DORIid: string
    // cameraId: string
  ) => {
    setIdsDORI((prev) =>
      prev.includes(DORIid)
        ? prev.filter((item) => item !== DORIid)
        : [...prev, DORIid]
    );
    // setCamId((prev) =>
    //   prev.includes(cameraId)
    //     ? prev.filter((item) => item !== cameraId)
    //     : [...prev, cameraId]
    // );
  };
  return (
    <main>
      <header></header>
      <section className="py-5 mx-auto px-4 max-w-8xl">
        <Card className="flex lg:flex-row p-5">
          <div className="lg:w-[65%] ">
            <CardContent>
              <CardHeader>
                <CardTitle>Room Lyout</CardTitle>
              </CardHeader>
              <Konva idsDORI={idsDORI} />
            </CardContent>
          </div>
          <div className="lg:w-[35%] bg-gray-100 rounded-xl">
            <CardContent>
              <CardHeader>
                <CardTitle>Camera Details</CardTitle>
              </CardHeader>
              <Cameras DORIClicked={DORIClicked} idsDORI={idsDORI} />
            </CardContent>
          </div>
        </Card>
        {/* <h1>Room Layout</h1>
        <Konva /> */}
      </section>
      <section></section>
    </main>
  );
};

export default ResultPage;
