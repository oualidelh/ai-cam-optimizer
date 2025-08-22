import { Arc, Group, Path } from "react-konva";

const CameraPath = () => {
  const colors = [
    {
      startRadius: 0,
      layerThickness: 25,
      color: "rgba(66, 68, 65, 0.5)",
    },
    {
      startRadius: 25,
      layerThickness: 200,
      color: "rgba(9, 153, 6, 0.5)",
    },
    {
      startRadius: 200,
      layerThickness: 400,
      color: "rgba(64, 158, 210, 0.4)",
    },
    {
      startRadius: 400,
      layerThickness: 750,
      color: "rgba(49, 118, 159, 0.4)",
    },
    {
      startRadius: 750,
      layerThickness: 1350,
      color: "rgba(213, 213, 213, 0.2)",
    },
  ];
  return (
    <Group x={400} y={500} draggable={true}>
      <Path
        x={50}
        y={50}
        data="M2 6 h14 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-14 a2 2 0 0 1 -2 -2 v-8 a2 2 0 0 1 2 -2 z"
        stroke="black"
        fill="green"
        scaleX={2}
        scaleY={2}
      />
      <Path
        x={50}
        y={50}
        data="M16 13 L21.223 16.482 A0.5 0.5 0 0 0 22 16.066 V7.87 A0.5 0.5 0 0 0 21.248 7.438 L16 10.5"
        stroke="black"
        scaleX={2}
        scaleY={2}
      />
      {colors.map((color, index) => (
        <Arc
          key={index}
          innerRadius={color.startRadius}
          outerRadius={color.layerThickness}
          angle={120}
          rotation={-30}
          fill={color.color}
        />
      ))}
    </Group>
  );
};

export default CameraPath;
