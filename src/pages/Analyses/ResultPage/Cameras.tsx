import { useAnalysesStore } from "@/store/ZustandStore";

import CameraDetails from "./CameraDetails";
type CamerasProps = {
  DORIClicked: (DORIid: string) => void;
  handleCamControl: (
    id: string,
    value: string | number,
    controlType: string
  ) => void;
  idsDORI: string[];
};

const Cameras = ({ DORIClicked, idsDORI, handleCamControl }: CamerasProps) => {
  const { camerasCharc, tiltValues } = useAnalysesStore();

  console.log("tiltValues", tiltValues);
  return (
    <div className="flex flex-col gap-3">
      {camerasCharc &&
        camerasCharc.map((camera, index) => {
          return (
            <CameraDetails
              key={camera.id}
              idsDORI={idsDORI}
              camera={camera}
              cameraIndex={index}
              DORIClicked={DORIClicked}
              handleCamControl={handleCamControl}
            />
          );
        })}
    </div>
  );
};

export default Cameras;
