import { useState } from "react";
import CircularSlider from "react-circular-slider-svg";

const CircularSliderCom = () => {
  const [value1, setValue1] = useState<number>(0);
  return (
    <div>
      <CircularSlider
        size={150}
        trackWidth={4}
        minValue={0}
        maxValue={359}
        startAngle={0}
        endAngle={359}
        angleType={{
          direction: "cw",
          axis: "-y",
        }}
        handle1={{
          value: value1,
          onChange: (v) => {
            setValue1(v);
            // handleCamRotation(camera.id, v);
            console.log("value angle", value1);
          },
        }}
        arcColor="#2b7fff"
        arcBackgroundColor="#eeeeee"
      />
    </div>
  );
};

export default CircularSliderCom;
