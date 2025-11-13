import { useRoomCells } from "@/hooks/useCellsRoom";
import { useMeasurementUnit } from "@/hooks/useMeasurementUnit";
import { useAnalysesStore } from "@/store/ZustandStore";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import {
  Layer,
  Rect,
  Stage,
  // Arc,
  Group,
  Path,
  Transformer,
  // Shape,
  // Ring,
} from "react-konva";
import CameraDori from "./CameraDori";
import { Camera } from "lucide-react";

interface KonvaPageProps {
  idsDORI: string[];
  // camRotation: CamRotation[];
  // tiltValues: TiltValues;
}

// type CamPosition = {
//   camId: string;
//   camX: number;
//   camY: number;
// };

// type CamPositions = CamPosition[];

const KonvaComponent = ({
  idsDORI,
}: // camRotation,
// tiltValues,
KonvaPageProps) => {
  const { camerasCharc, roomDetails, setCamerasCharc } = useAnalysesStore();
  // console.log("camerasCharc", camerasCharc);
  // console.log("roomDetails", roomDetails);
  const stageRef = useRef<Konva.Stage | null>(null);
  const rectRef = useRef<Konva.Rect | null>(null);
  const groupRef = useRef<Konva.Group | null>(null);
  const konvaContainerRef = useRef<HTMLDivElement>(null);
  const { measurementUnit, stagWidth } = useMeasurementUnit(
    roomDetails.roomWidth,
    konvaContainerRef
  );

  // const [camPositions, setCamPositions] = useState<CamPositions>([]);

  const cells = useRoomCells({ roomDetails, measurementUnit });

  // console.log("cells", cells);

  const stageHeight = roomDetails.roomLength * measurementUnit + 6;
  console.log(
    "camPositions",
    // camPositions,
    roomDetails.roomWidth
  );

  console.log(
    "groupRef konvaContainerRef",
    groupRef.current?.getAbsolutePosition(),
    "konvaContainerRef.current?.getBoundingClientRect().x",
    konvaContainerRef.current?.getBoundingClientRect().x,
    konvaContainerRef.current?.getBoundingClientRect().y,
    "konvaContainerRef.current?.clientWidth",
    konvaContainerRef.current?.clientWidth,
    "stagWidth",
    stagWidth,
    "rectRef",
    rectRef.current?.width(),
    rectRef.current?.height(),
    // rectRef.current,
    "measurementUnit",
    measurementUnit,
    "measurementUnit",
    window.innerWidth
  );

  useEffect(() => {
    if (groupRef.current && rectRef.current && stageRef.current) {
      console.log(
        "groupRef konvaContainerRef",
        groupRef.current.getAbsolutePosition(),
        konvaContainerRef.current?.getBoundingClientRect().x,
        konvaContainerRef.current?.clientWidth,
        "camerasCharc inside useeffect",
        camerasCharc
      );

      // setCamPositions((prev) => {
      //   // const newPositions = camerasCharc
      //   //   .filter((cam) => !prev?.some((camPos) => camPos.camId === cam.id))
      //   //   .map((cam) => ({
      //   //     camId: cam.id,
      //   //     camX: groupRef.current?.getAbsolutePosition().x
      //   //       ? groupRef.current?.getAbsolutePosition().x * measurementUnit
      //   //       : 0,
      //   //     camY: groupRef.current?.getAbsolutePosition().y
      //   //       ? groupRef.current?.getAbsolutePosition().y * measurementUnit
      //   //       : 0,
      //   //   }));

      //   // return [...prev, ...newPositions];

      //   const camPosArray = camerasCharc.map((camCar) => {
      //     const exist = prev.some((camPos) => camPos.camId === camCar.id);
      //     if (exist) {
      //       return {

      //       };
      //     }
      //   });
      // });

      const maxWidth = rectRef.current?.width();
      const maxRectWidth =
        maxWidth > rectRef.current?.width()
          ? maxWidth
          : rectRef.current?.width();

      const relativeRectWidth =
        rectRef.current?.width() /
        (window.outerWidth - stageRef.current?.getAbsolutePosition().x);

      console.log(
        "relativeRectWidth maxRectWidth rectRef.current?.width() minWidth",
        relativeRectWidth,
        maxRectWidth,
        rectRef.current?.width()
      );
      setCamerasCharc((prev) => {
        return prev.map((cam) => {
          return {
            ...cam,
            camPosition: {
              x: groupRef.current?.getAbsolutePosition().x
                ? groupRef.current?.getAbsolutePosition().x * relativeRectWidth
                : 0,
              y: groupRef.current?.getAbsolutePosition().y ?? 0,
            },
          };
        });
      });
    }
  }, [measurementUnit]); // Run once after initial render

  const transformerRef = useRef<Konva.Transformer>(null);

  const onShapeClick = (e: KonvaEventObject<MouseEvent>) => {
    const currentTarget = e.currentTarget;
    console.log("currentTarget", currentTarget.rotation());

    transformerRef?.current?.nodes([currentTarget]);
  };

  // const onBgClick = () => {
  //   transformerRef?.current?.nodes([]);
  // };

  return (
    <div ref={konvaContainerRef} className="konva-container h-auto">
      <Stage
        ref={stageRef}
        className="flex justify-center w-[100%] h-auto py-0"
        width={stagWidth.current}
        height={stageHeight}
        // onClick={onBgClick}
      >
        <Layer>
          <Rect
            ref={rectRef}
            x={2}
            y={2}
            width={roomDetails.roomWidth * measurementUnit}
            height={roomDetails.roomLength * measurementUnit}
            fill="white"
            stroke="black"
            strokeWidth={4}
          />
          {/* <Group draggable={true} onClick={onShapeClick}>
            {cells.map((cell) => {
              return (
                <Rect
                  x={cell.x}
                  y={cell.y}
                  width={cell.width}
                  height={cell.height}
                  stroke={cell.stroke}
                  strokeWidth={cell.strokeWidth}
                />
              );
            })}
          </Group> */}
          {camerasCharc.length > 0 &&
            camerasCharc.map((camera) => {
              // const camPos = camPositions?.find(
              //   (camPos) => camPos.camId === camera.id
              // );
              return (
                <Group
                  x={camera.camPosition.x}
                  y={camera.camPosition.y}
                  ref={groupRef}
                  rotation={camera.camRotation}
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
                  {camera.cameraDORI.map((dori, i, array) =>
                    idsDORI.includes(dori.id) ? (
                      <Group key={dori.id}>
                        <CameraDori
                          width={300}
                          height={300}
                          doriId={dori.id}
                          cameraId={camera.id}
                          i={i}
                          array={array}
                          roomHeight={roomDetails.roomHeight}
                          tiltVal={camera.tiltRange}
                          horizontalFOV={camera.horizontalFOV}
                          verticalFOV={camera.verticalFOV}
                          lastDORIVal={array[array.length - 1].layerThickness}
                          starterRadius={
                            i === 0 ? 0 : array[i - 1].layerThickness
                          }
                          layerThickness={dori.layerThickness}
                          measurementUnit={measurementUnit}
                          angle={camera.horizontalFOV}
                          rotation={-45}
                          fill={dori.color}
                          onClick={onShapeClick}
                        />
                        {/* <Arc
                          key={dori.id}
                          // innerRadius={
                          //   i === 0 ||
                          //   computeCamTilt(
                          //     roomDetails.roomHeight,
                          //     tiltVal,
                          //     camera.verticalFOV,
                          //     array[array.length - 1].layerThickness,
                          //     dori.layerThickness
                          //   ) < array[i - 1].layerThickness
                          //     ? 0 * measurementUnit
                          //     : array[i - 1].layerThickness * measurementUnit
                          // }
                          // outerRadius={
                          //   computeCamTilt(
                          //     roomDetails.roomHeight,
                          //     tiltVal,
                          //     camera.verticalFOV,
                          //     array[array.length - 1].layerThickness,
                          //     dori.layerThickness
                          //   ) < array[i === 0 ? 0 : i - 1].layerThickness
                          //     ? 0 * measurementUnit
                          //     : computeCamTilt(
                          //         roomDetails.roomHeight,
                          //         tiltVal,
                          //         camera.verticalFOV,
                          //         array[array.length - 1].layerThickness,
                          //         dori.layerThickness
                          //       ) * measurementUnit
                          // }
                          innerRadius={
                            computeSingleDoriTilt(
                              roomDetails.roomHeight,
                              tiltVal,
                              camera.verticalFOV,
                              array[array.length - 1].layerThickness,
                              i === 0 ? 0 : array[i - 1].layerThickness,
                              dori.layerThickness
                            ).scaledInnerRadius * measurementUnit
                          }
                          outerRadius={
                            computeSingleDoriTilt(
                              roomDetails.roomHeight,
                              tiltVal,
                              camera.verticalFOV,
                              array[array.length - 1].layerThickness,
                              i === 0 ? 0 : array[i - 1].layerThickness,
                              dori.layerThickness
                            ).scaledOuterRadius * measurementUnit
                          }
                          angle={camera.horizontalFOV}
                          rotation={-96}
                          fill={dori.color}
                          onClick={onShapeClick}
                        /> */}
                      </Group>
                    ) : null
                  )}
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
