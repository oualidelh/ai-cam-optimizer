import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CircularSlider from "@fseehawer/react-circular-slider";

type CameraDetailsProps = {
  camera: CameraDetails;
  cameraIndex: number;
  DORIClicked: (DORIid: string) => void;
  idsDORI: string[];
};

const CameraDetails = ({
  camera,
  cameraIndex,
  DORIClicked,
  idsDORI,
}: CameraDetailsProps) => {
  return (
    <div>
      <Card className=" shadow-medium ">
        <div>
          <CardHeader className="flex gap-3">
            <img
              className="w-20 h-20"
              width="full"
              height="full"
              src="/src/assets/cctv-cam.jpg"
              alt="cctvCam"
            />
            <div>
              <CardTitle>Camera {cameraIndex + 1}</CardTitle>
              <CardDescription>Camera Control</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <div>
                <CircularSlider onChange={(value) => console.log(value)} />
              </div>
              <h4>DORI Distance</h4>
              <div className="flex gap-2">
                {camera &&
                  camera.cameraDORI.map((dori) => {
                    return (
                      <div
                        className="w-1/4 lg:2/4 my-2 "
                        key={dori.id}
                        onClick={() => DORIClicked(dori.id)}
                      >
                        <img
                          className={`w-full h-full aspect-square rounded-lg ${
                            idsDORI.includes(dori.id)
                              ? "grayscale-0 ring-2 ring-primary"
                              : "grayscale-100"
                          }`}
                          src={`${dori.pixelatedImg}`}
                          alt="DORI-PIXELS"
                        />
                        <p className="text-wrap">{dori.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default CameraDetails;
