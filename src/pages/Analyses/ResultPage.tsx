import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Konva from "./Konva";

// interface ResultPageProps {
//   cameraDetails: CameraDetails;
//   roomDetails: RoomDetails;
// }

const ResultPage = () => {
  return (
    <main>
      <header></header>
      <section className="py-5 bg-red-500 container mx-auto px-4 max-w-8xl">
        <Card className="flex flex-row p-5">
          <div className="w-[65%] bg-amber-400">
            <CardContent>
              <CardHeader>
                <CardTitle>Room Lyout</CardTitle>
              </CardHeader>
              <Konva />
            </CardContent>
          </div>
          <div className="w-[35%] bg-green-600">
            <CardContent>
              <CardHeader>
                <CardTitle>Camera Details</CardTitle>
              </CardHeader>
            </CardContent>
          </div>
        </Card>
        {/* <h1>Room Layout</h1>
        <Konva /> */}
      </section>
      <section></section>
    </main>
  );
};

export default ResultPage;
