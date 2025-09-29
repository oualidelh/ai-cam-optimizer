/// <reference types="vite/client" />
type feature = {
  logo: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  content: string;
};

type AnalysesBtn = {
  isRoom: boolean;
  isCamera: boolean;
};

type RoomDetails = {
  roomWidth: number;
  roomLength: number;
  roomHeight: number;
};
type DORI = {
  id: string;
  name: string;
  pixelatedImg: string;
  layerThickness: number;
  color: string;
};

type CameraDORI = DORI[];

type CameraDetails = {
  id: string;
  cameraDORI: CameraDORI;
  horizontalFOV: number;
  tiltRange: number;
  camRotation: number;
  verticalFOV: number;
};

type CamerasCharc = CameraDetails[];

type CameraCount = number;

type CamRotation = {
  camId: string;
  rotationVal: string | number;
};

type CellsAttr = {
  x: number;
  y: number;
  stroke: string;
  width: number;
  height: number;
  strokeWidth: number;
};
type CellsArray = CellsAttr[];

type TiltValue = {
  tiltId: string;
  tiltVal: number;
};

type TiltValues = TiltValue[];
