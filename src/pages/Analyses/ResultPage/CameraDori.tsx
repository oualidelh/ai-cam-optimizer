import {
  computeRingAfterTiltBotRay,
  computeRingAfterTiltTopRay,
} from "@/lib/calculateTiltRange";

import { Context } from "konva/lib/Context";
import type { NodeConfig } from "konva/lib/Node";
import { Shape as ShapeType } from "konva/lib/Shape";
import { Shape } from "react-konva";

const sceneFunc = (context: Context, shape: ShapeType) => {
  context.beginPath();

  const innerTop =
    computeRingAfterTiltTopRay(
      shape.getAttr("roomHeight"),
      shape.getAttr("angle"),
      shape.getAttr("tiltVal"),
      shape.getAttr("verticalFOV"),
      shape.getAttr("starterRadius"),
      shape.getAttr("layerThickness")
    ).innerTop * shape.getAttr("measurementUnit");

  const outerTop =
    computeRingAfterTiltTopRay(
      shape.getAttr("roomHeight"),
      shape.getAttr("angle"),
      shape.getAttr("tiltVal"),
      shape.getAttr("verticalFOV"),
      shape.getAttr("starterRadius"),
      shape.getAttr("layerThickness")
    ).outerTop * shape.getAttr("measurementUnit");

  const withdrawalAngleTop = computeRingAfterTiltTopRay(
    shape.getAttr("roomHeight"),
    shape.getAttr("angle"),
    shape.getAttr("tiltVal"),
    shape.getAttr("verticalFOV"),
    shape.getAttr("starterRadius"),
    shape.getAttr("layerThickness")
  ).withdrawalAngleTop;

  const innerBot =
    computeRingAfterTiltBotRay(
      shape.getAttr("roomHeight"),
      shape.getAttr("angle"),
      shape.getAttr("tiltVal"),
      shape.getAttr("verticalFOV"),
      shape.getAttr("starterRadius"),
      shape.getAttr("layerThickness")
    ).innerBot * shape.getAttr("measurementUnit");

  const outerBot =
    computeRingAfterTiltBotRay(
      shape.getAttr("roomHeight"),
      shape.getAttr("angle"),
      shape.getAttr("tiltVal"),
      shape.getAttr("verticalFOV"),
      shape.getAttr("starterRadius"),
      shape.getAttr("layerThickness")
    ).outerBot * shape.getAttr("measurementUnit");

  const withdrawalAngleBot = computeRingAfterTiltBotRay(
    shape.getAttr("roomHeight"),
    shape.getAttr("angle"),
    shape.getAttr("tiltVal"),
    shape.getAttr("verticalFOV"),
    shape.getAttr("starterRadius"),
    shape.getAttr("layerThickness")
  ).withdrawalAngleBot;

  const upperRadians =
    ((shape.getAttr("angle") / 2 + (withdrawalAngleTop ?? 0)) * Math.PI) / 180;

  const lowerRadians =
    ((shape.getAttr("angle") / 2 + (withdrawalAngleBot ?? 0)) * Math.PI) / 180;

  // console.log(
  //   "upperRadians",
  //   upperRadians,
  //   shape.getAttr("angle") / 2 + (withdrawalAngleTop ?? 0),
  //   "outerTop",
  //   outerTop,
  //   "innerTop",
  //   innerTop,
  //   "outerBot",
  //   outerBot,
  //   "innerBot",
  //   innerBot,
  //   "shape.getAttr(i)",
  //   shape.getAttr("i"),
  //   'shape.getAttr("tiltValues")',
  //   shape.getAttr("tiltValues")
  //   // "tiltValue",
  //   // camTilt
  // );

  // upper projection

  // Draw the left side of the triangle

  context.moveTo(
    outerTop * Math.cos(upperRadians),
    outerTop * Math.sin(upperRadians)
  ); // Start from left edge of base

  context.lineTo(
    innerTop * Math.cos(upperRadians),
    innerTop * Math.sin(upperRadians)
  );
  context.lineTo(
    innerTop * Math.cos(upperRadians),
    -innerTop * Math.sin(upperRadians)
  );
  context.lineTo(
    outerTop * Math.cos(upperRadians),
    -outerTop * Math.sin(upperRadians)
  );

  // context.fillStyle = shape.getAttr("fill");

  // // Fill and stroke the shape
  context.fillStrokeShape(shape);

  // // left side projection
  context.moveTo(
    outerTop * Math.cos(upperRadians),
    outerTop * Math.sin(upperRadians)
  ); // Start from left edge of base

  context.lineTo(
    innerTop * Math.cos(upperRadians),
    innerTop * Math.sin(upperRadians)
  );

  context.lineTo(
    innerBot * Math.cos(lowerRadians),
    innerBot * Math.sin(lowerRadians)
  );

  context.lineTo(
    outerBot * Math.cos(lowerRadians),
    outerBot * Math.sin(lowerRadians)
  ); // Start from left edge of base

  // // // context.fillStyle = shape.getAttr("fill");

  // // // // Fill and stroke the shape
  // context.fillStrokeShape(shape);

  // right side projcetion
  context.moveTo(
    outerTop * Math.cos(upperRadians),
    -outerTop * Math.sin(upperRadians)
  );

  context.lineTo(
    outerBot * Math.cos(lowerRadians),
    -outerBot * Math.sin(lowerRadians)
  );

  context.lineTo(
    innerBot * Math.cos(lowerRadians),
    -innerBot * Math.sin(lowerRadians)
  );

  context.lineTo(
    innerTop * Math.cos(upperRadians),
    -innerTop * Math.sin(upperRadians)
  );

  // Fill and stroke the shape
  context.fillStrokeShape(shape); // Draw from tip to right edge of base

  // // lower project
  context.moveTo(
    outerBot * Math.cos(lowerRadians),
    outerBot * Math.sin(lowerRadians)
  ); // Start from left edge of base

  context.lineTo(
    innerBot * Math.cos(lowerRadians),
    innerBot * Math.sin(lowerRadians)
  );
  context.lineTo(
    innerBot * Math.cos(lowerRadians),
    -innerBot * Math.sin(lowerRadians)
  );
  context.lineTo(
    outerBot * Math.cos(lowerRadians),
    -outerBot * Math.sin(lowerRadians)
  );

  context.fillStyle = shape.getAttr("fill");

  // Fill and stroke the shape
  context.fillStrokeShape(shape); // Draw from tip to right edge of base
};

export default function CameraDori(props: NodeConfig) {
  return (
    <Shape
      {...props}
      // fill="#FF6347"
      // stroke="black"
      strokeWidth={1}
      rotation={-45}
      sceneFunc={sceneFunc}
    />
  );
}
