import { create } from "zustand";

type AnalysesStore = {
  roomDetails: RoomDetails;
  setRoomDetails: React.Dispatch<React.SetStateAction<RoomDetails>>;
  cameraDetails: CameraDetails;
  setCameraDetails: React.Dispatch<React.SetStateAction<CameraDetails>>;
  camerasCharc: CamerasCharc;
  setCamerasCharc: React.Dispatch<React.SetStateAction<CamerasCharc>>;
  cameraCount: CameraCount;
  setCameraCount: React.Dispatch<React.SetStateAction<number>>;
  tiltValues: TiltValues;
  setTiltValues: React.Dispatch<React.SetStateAction<TiltValues>>;
  // handleCamControl: (
  //   id: string,
  //   value: string | number,
  //   controlType: string
  // ) => void;
};

export const useAnalysesStore = create<AnalysesStore>((set) => ({
  roomDetails: {
    roomWidth: 20,
    roomLength: 30,
    roomHeight: 5,
  },

  cameraDetails: {
    id: "",
    cameraDORI: [
      {
        id: "",
        name: "identify",
        pixelatedImg: "public/id-pixel.png",
        layerThickness: 5,
        color: "rgba(9, 153, 6, 0.5)",
      },
      {
        id: "",
        name: "recognize",
        pixelatedImg: "public/re-pixel.png",
        layerThickness: 9.9,
        color: "rgba(64, 158, 210, 0.4)",
      },
      {
        id: "",
        name: "observe",
        pixelatedImg: "public/ob-pixel.png",
        layerThickness: 19.9,
        color: "rgba(49, 118, 159, 0.4)",
      },
      {
        id: "",
        name: "detect",
        pixelatedImg: "public/de-pixel.png",
        layerThickness: 49,
        color: "rgba(213, 213, 213, 0.2)",
      },
    ],
    horizontalFOV: 84,
    tiltRange: 78,
    camRotation: 360,
    verticalFOV: 71,
    camPosition: {
      x: 2,
      y: 2,
    },
  },
  camerasCharc: [],
  cameraCount: 1,
  tiltValues: [
    {
      tiltId: "",
      tiltVal: 0,
    },
  ],
  setRoomDetails: (value) =>
    set((state) => ({
      roomDetails:
        typeof value === "function" ? value(state.roomDetails) : value,
    })),
  setCameraDetails: (value) =>
    set((state) => ({
      cameraDetails:
        typeof value === "function" ? value(state.cameraDetails) : value,
    })),
  setCamerasCharc: (value) =>
    set((state) => ({
      camerasCharc:
        typeof value === "function" ? value(state.camerasCharc) : value,
    })),
  setCameraCount: (count) =>
    set((state) => ({
      cameraCount:
        typeof count === "function" ? count(state.cameraCount) : count,
    })),
  setTiltValues: (camTilt) =>
    set((state) => ({
      tiltValues:
        typeof camTilt === "function" ? camTilt(state.tiltValues) : camTilt,
    })),

  // handleCamControl: (control) => set((state)=>({
  //   switch (control.type) {
  //     case value:

  //       break;

  //     default:
  //       break;
  //   }
  // }))
}));
