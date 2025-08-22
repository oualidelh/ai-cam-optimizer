import { useAnalysesStore } from "@/store/ZustandStore";

import CameraDetails from "./CameraDetails";
type CamerasProps = {
  DORIClicked: (DORIid: string) => void;
  idsDORI: string[];
};

const Cameras = ({ DORIClicked, idsDORI }: CamerasProps) => {
  const { camerasCharc } = useAnalysesStore();
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
            />
          );
        })}
    </div>
  );
};

export default Cameras;
