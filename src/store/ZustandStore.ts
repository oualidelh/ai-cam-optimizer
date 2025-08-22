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
        pixelatedImg: "/src/assets/id-pixel.png",
        startRadius: 0,
        layerThickness: 5,
        color: "",
      },
      {
        id: "",
        name: "recognize",
        pixelatedImg: "/src/assets/re-pixel.png",
        startRadius: 5,
        layerThickness: 9.9,
        color: "",
      },
      {
        id: "",
        name: "observe",
        pixelatedImg: "/src/assets/ob-pixel.png",
        startRadius: 9.9,
        layerThickness: 19.9,
        color: "",
      },
      {
        id: "",
        name: "detect",
        pixelatedImg: "/src/assets/de-pixel.png",
        startRadius: 19.9,
        layerThickness: 49,
        color: "",
      },
    ],
    horizontalFOV: 84,
    tiltRange: 78,
  },
  camerasCharc: [],
  cameraCount: 1,
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
}));
