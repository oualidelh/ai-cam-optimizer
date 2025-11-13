import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Konva from "./Konva";
import Cameras from "./Cameras";
import { useState } from "react";
import { useAnalysesStore } from "@/store/ZustandStore";

// interface ResultPageProps {
//   cameraDetails: CameraDetails;
//   roomDetails: RoomDetails;
// }

const ResultPage = () => {
  const { camerasCharc, setCamerasCharc } = useAnalysesStore();
  const [idsDORI, setIdsDORI] = useState<string[]>([
    camerasCharc[camerasCharc.length && camerasCharc.length - 1]?.cameraDORI[0]
      .id,
  ]);

  // const [tiltValues, setTiltValues] = useState<TiltValues>();

  // const [camRotation, setCamRotation] = useState<CamRotation[]>([]);

  const DORIClicked = (DORIid: string) => {
    setIdsDORI((prev) =>
      prev.includes(DORIid)
        ? prev.filter((item) => item !== DORIid)
        : [...prev, DORIid]
    );
  };

  const handleCamControl = (
    id: string,
    value: string | number,
    controlType: string
  ) => {
    switch (controlType) {
      case "tilt": {
        console.log("controleType", controlType);
        const tiltRange = typeof value === "string" ? Number(value) : value;

        // setTiltValues((prev) => {
        //   return prev?.map((camTilt) =>
        //     camTilt.tiltId === id
        //       ? {
        //           ...camTilt,
        //           tiltVal: tiltRange,
        //         }
        //       : camTilt
        //   );
        // });

        // setTiltVal(tiltRange);
        setCamerasCharc((prev) => {
          return prev.map((cam) =>
            cam.id === id
              ? {
                  ...cam,
                  tiltRange,
                }
              : cam
          );
        });
        break;
      }
      case "rotation": {
        console.log("controleType", controlType);
        const rotationVal = typeof value === "string" ? Number(value) : value;
        setCamerasCharc((prev) => {
          return prev.map((cam) =>
            cam.id === id ? { ...cam, camRotation: rotationVal } : cam
          );
        });
        break;
      }
      default: {
        console.log("Oops there is no such control type");
      }
    }
  };
  return (
    <main>
      <header></header>
      <section className="py-5 mx-auto px-4 max-w-8xl">
        <Card className="flex lg:flex-row p-5">
          <div className="lg:w-[65%]  bg-gray-100 rounded-lg p-3">
            <CardContent>
              <CardHeader>
                <CardTitle>Room Lyout</CardTitle>
              </CardHeader>
              <Konva
                idsDORI={idsDORI}
                // camRotation={camRotation}
                // tiltValues={tiltValues}
              />
            </CardContent>
          </div>
          <div className="lg:w-[35%] bg-gray-100 rounded-lg p-3">
            <CardContent>
              <CardHeader>
                <CardTitle>Camera Details</CardTitle>
              </CardHeader>
              <Cameras
                DORIClicked={DORIClicked}
                handleCamControl={handleCamControl}
                idsDORI={idsDORI}
              />
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
