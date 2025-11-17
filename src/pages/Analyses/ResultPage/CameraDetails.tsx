import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAnalysesStore } from "@/store/ZustandStore";
import { useState } from "react";
import CircularSlider from "react-circular-slider-svg";
// import CircularSlider from "@fseehawer/react-circular-slider";

type CameraDetailsProps = {
  camera: CameraDetails;
  cameraIndex: number;
  DORIClicked: (DORIid: string) => void;
  idsDORI: string[];
  handleCamControl: (
    id: string,
    value: string | number,
    controlType: string
  ) => void;
};

const CameraDetails = ({
  camera,
  cameraIndex,
  DORIClicked,
  idsDORI,
  handleCamControl,
}: CameraDetailsProps) => {
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(0);
  const { tiltValues } = useAnalysesStore();

  console.log("tiltValues", tiltValues);

  const camTilt = tiltValues?.filter(
    (camTilt: TiltValue) => camTilt.tiltId === camera.id
  );

  const camTiltVal = camTilt ? camTilt[0]?.tiltVal : 0;

  console.log("value angle", value1);
  return (
    <div>
      <Card className=" shadow-medium ">
        <div>
          <CardHeader className="flex gap-3">
            <img
              className="w-20 h-20"
              width="full"
              height="full"
              src="/src/assets/cctvcam.jpg"
              alt="cctvCam"
            />
            <div>
              <CardTitle>Camera {cameraIndex + 1}</CardTitle>
              <CardDescription>Camera Control</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <div className="flex items-center justify-around my-3 shadow-inner rounded-lg bg-gray-100 p-1">
                <div>
                  <CircularSlider
                    size={100}
                    trackWidth={4}
                    minValue={0}
                    maxValue={camTiltVal}
                    startAngle={0}
                    endAngle={180}
                    angleType={{
                      direction: "cw",
                      axis: "+x",
                    }}
                    handle1={{
                      value: value1,
                      onChange: (v) => {
                        setValue1(v);
                        // handleCamRotation(camera.id, v);
                        handleCamControl(camera.id, v, "tilt");
                      },
                    }}
                    arcColor="#2b7fff"
                    arcBackgroundColor="#eeeeee"
                  />
                  <span className="text-muted-foreground text-sm">
                    Tilt Range {Math.round(value1)}
                  </span>
                </div>
                <div>
                  <CircularSlider
                    size={100}
                    trackWidth={4}
                    minValue={0}
                    maxValue={359}
                    startAngle={0}
                    endAngle={359}
                    angleType={{
                      direction: "cw",
                      axis: "-y",
                    }}
                    handle1={{
                      value: value2,
                      onChange: (v) => {
                        setValue2(v);
                        handleCamControl(camera.id, v, "rotation");
                      },
                    }}
                    arcColor="#2b7fff"
                    arcBackgroundColor="#eeeeee"
                  />
                  <span className="text-muted-foreground text-sm">
                    rotation Range {Math.round(value2)}
                  </span>
                </div>
              </div>
              <h4>DORI Distance</h4>
              <div className="flex gap-2">
                {camera &&
                  camera.cameraDORI.map((dori) => {
                    return (
                      <div
                        className="w-1/4 lg:2/4 my-2 "
                        key={dori.id}
                        onClick={() => DORIClicked(dori.id)}
                      >
                        <img
                          className={`w-full h-full aspect-square rounded-lg ${
                            idsDORI.includes(dori.id)
                              ? "grayscale-0 ring-2 ring-primary"
                              : "grayscale-100"
                          }`}
                          src={`${dori.pixelatedImg}`}
                          alt="DORI-PIXELS"
                        />
                        <p className="text-wrap">{dori.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default CameraDetails;
