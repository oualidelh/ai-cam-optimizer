import { useState } from "react";
import InputSetup from "./InputSetup";
import Konva from "./Konva";

const roomDetailsInit = {
  width: 20,
  length: 15,
  height: 5,
};

const Analyses = () => {
  const [roomDetails, setRoomDetails] = useState(roomDetailsInit);
  return (
    <main className="min-h-[100vh] pt-16">
      <InputSetup roomDetails={roomDetails} setRoomDetails={setRoomDetails} />
      {/* <Konva /> */}
    </main>
  );
};

export default Analyses;
