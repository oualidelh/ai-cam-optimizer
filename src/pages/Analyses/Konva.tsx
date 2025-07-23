import {
  Circle,
  Layer,
  Rect,
  Stage,
  Text,
  Arrow,
  Arc,
  Group,
  Path,
} from "react-konva";

const Konva = () => {
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
    <div className="relative h-[calc(100vh-64px)] ">
      <Stage
        className=" absolute pt-6 top-16 "
        width={window.innerWidth}
        height={window.innerHeight}
        top={16}
      >
        <Layer>
          <Rect
            x={20}
            y={20}
            width={500}
            height={250}
            fill="white"
            stroke="black"
            strokeWidth={4}
          />
        </Layer>
        <Layer>
          <Arrow
            x={window.innerWidth / 4}
            y={window.innerHeight / 4}
            points={[0, 0, 100, 100]}
            pointerLength={20}
            pointerWidth={20}
            fill="black"
            stroke="black"
            strokeWidth={4}
          />
          <Group x={400} y={500} draggable={true}>
            <Path
              x={-10}
              y={-10}
              data="M2 6 h14 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-14 a2 2 0 0 1 -2 -2 v-8 a2 2 0 0 1 2 -2 z"
              stroke="black"
              opacity={0.4}
              scaleX={1}
              scaleY={1}
            />
            <Path
              x={-10}
              y={-10}
              data="M16 13 L21.223 16.482 A0.5 0.5 0 0 0 22 16.066 V7.87 A0.5 0.5 0 0 0 21.248 7.438 L16 10.5"
              stroke="black"
              opacity={0.4}
              scaleX={1}
              scaleY={1}
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
        </Layer>
      </Stage>
    </div>
  );
};

export default Konva;
