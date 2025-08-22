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
type CameraDORI = [
  {
    id: string;
    name: string;
    pixelatedImg: string;
    startRadius: number;
    layerThickness: number;
    color: string;
  },
  {
    id: string;
    name: string;
    pixelatedImg: string;
    startRadius: number;
    layerThickness: number;
    color: string;
  },
  {
    id: string;
    name: string;
    pixelatedImg: string;
    startRadius: number;
    layerThickness: number;
    color: string;
  },
  {
    id: string;
    name: string;
    pixelatedImg: string;
    startRadius: number;
    layerThickness: number;
    color: string;
  }
];
type CameraDetails = {
  id: string;
  cameraDORI: CameraDORI;
  horizontalFOV: number;
  tiltRange: number;
};

type CamerasCharc = CameraDetails[];

type CameraCount = number;
