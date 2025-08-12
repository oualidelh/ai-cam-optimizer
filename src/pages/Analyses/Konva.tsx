import { useAnalysesStore } from "@/store/ZustandStore";
import { useRef } from "react";
import { Layer, Rect, Stage, Arc, Group, Path } from "react-konva";

// interface KonvaPageProps {
//   cameraDetails: CameraDetails;
//   roomDetails: RoomDetails;
// }

const Konva = () => {
  const { camerasCharc, roomDetails } = useAnalysesStore();
  console.log("camerasCharc", camerasCharc);
  const konvaContainerRef = useRef<HTMLDivElement>(null);
  console.log("konvaContainerRef", konvaContainerRef?.current?.clientWidth);

  return (
    <div
      ref={konvaContainerRef}
      className="konva-container  h-[calc(100vh-64px)]  bg-green-500"
    >
      <Stage
        className="flex justify-center pt-3 bg-blue-600 w-[100%] h-[100%] overflow-hidden "
        width={window.innerWidth}
        height={window.innerHeight}
        color="red"
      >
        <Layer>
          <Rect
            x={20}
            y={20}
            width={roomDetails.roomWidth * 20}
            height={roomDetails.roomLength * 20}
            fill="white"
            stroke="black"
            strokeWidth={4}
          />
        </Layer>
        <Layer>
          {camerasCharc.map((camera, i) => {
            return (
              <Group key={i} x={400} y={500} draggable={true}>
                <Path
                  x={-4}
                  y={-5}
                  data="M2 6 h14 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-14 a2 2 0 0 1 -2 -2 v-8 a2 2 0 0 1 2 -2 z"
                  stroke="black"
                  opacity={1}
                  scaleX={0.5}
                  scaleY={0.5}
                />
                <Path
                  x={-4}
                  y={-5}
                  data="M16 13 L21.223 16.482 A0.5 0.5 0 0 0 22 16.066 V7.87 A0.5 0.5 0 0 0 21.248 7.438 L16 10.5"
                  stroke="black"
                  opacity={1}
                  scaleX={0.5}
                  scaleY={0.5}
                />
                {camera.cameraDORI.map((dori, index) => (
                  <Arc
                    key={index}
                    innerRadius={dori.startRadius * 20}
                    outerRadius={dori.layerThickness * 20}
                    angle={camera.horizontalFOV}
                    rotation={-30}
                    fill={dori.color}
                  />
                ))}
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Konva;
