import { useMeasurementUnit } from "@/hooks/useMeasurementUnit";
import { useAnalysesStore } from "@/store/ZustandStore";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useRef } from "react";
import { Layer, Rect, Stage, Arc, Group, Path, Transformer } from "react-konva";

interface KonvaPageProps {
  idsDORI: string[];
}

const KonvaComponent = ({ idsDORI }: KonvaPageProps) => {
  const { camerasCharc, roomDetails } = useAnalysesStore();
  console.log("camerasCharc", camerasCharc);
  console.log("roomDetails", roomDetails);
  const stageRef = useRef<Konva.Stage | null>(null);
  const konvaContainerRef = useRef<HTMLDivElement>(null);
  console.log(konvaContainerRef.current?.clientWidth);
  const { measurementUnit, stagWidth } = useMeasurementUnit(
    roomDetails.roomWidth,
    konvaContainerRef
  );

  console.log("measurmentunit", measurementUnit);

  const stageHeight = roomDetails.roomLength * measurementUnit + 30;

  const groupRef = useRef(null);

  const transformerRef = useRef<Konva.Transformer>(null);

  const onShapeClick = (e: KonvaEventObject<MouseEvent>) => {
    const currentTarget = e.currentTarget;
    console.log("currentTarget", currentTarget);
    transformerRef?.current?.nodes([currentTarget]);
  };

  const onBgClick = () => {
    transformerRef?.current?.nodes([]);
  };

  return (
    <div ref={konvaContainerRef} className="konva-container h-auto">
      <Stage
        ref={stageRef}
        className="flex justify-center  w-[100%] h-auto  py-5 "
        width={stagWidth.current}
        height={stageHeight}
        onClick={onBgClick}
      >
        <Layer>
          <Rect
            x={20}
            y={20}
            width={roomDetails.roomWidth * measurementUnit}
            height={roomDetails.roomLength * measurementUnit}
            fill="white"
            stroke="black"
            strokeWidth={4}
          />
          {camerasCharc.length > 0 &&
            camerasCharc.map((camera) => {
              return (
                <Group
                  x={0}
                  y={0}
                  ref={groupRef}
                  rotation={45}
                  onClick={onShapeClick}
                  key={camera.id}
                  draggable={true}
                >
                  <Path
                    x={-11}
                    y={-6}
                    data="M2 6 h14 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-14 a2 2 0 0 1 -2 -2 v-8 a2 2 0 0 1 2 -2 z"
                    stroke="black"
                    opacity={1}
                    scaleX={0.5}
                    scaleY={0.5}
                    onClick={onShapeClick}
                  />
                  <Path
                    x={-11}
                    y={-6}
                    data="M16 13 L21.223 16.482 A0.5 0.5 0 0 0 22 16.066 V7.87 A0.5 0.5 0 0 0 21.248 7.438 L16 10.5"
                    stroke="black"
                    opacity={1}
                    scaleX={0.5}
                    scaleY={0.5}
                  />
                  {camera.cameraDORI
                    .filter((dori) => idsDORI.includes(dori.id))
                    .map((dori) => (
                      <Arc
                        key={dori.id}
                        innerRadius={dori.startRadius * measurementUnit}
                        outerRadius={dori.layerThickness * measurementUnit}
                        angle={camera.horizontalFOV}
                        rotation={-45}
                        fill={dori.color}
                        onClick={onShapeClick}
                      />
                    ))}
                </Group>
              );
            })}
          <Transformer ref={transformerRef} enabledAnchors={["rotater"]} />
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaComponent;
