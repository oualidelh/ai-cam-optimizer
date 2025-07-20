import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface InfoCardProps {
  feature: feature;
}

const InfoCard = ({ feature }: InfoCardProps) => {
  return (
    <div>
      <Card className="bg-gradient-to-r h-full from-slate-50 to-slate-100 border-none shadow-primary/10 hover:shadow-md group flex flex-col items-center justify-center">
        <div className="bg-primary rounded-xl flex items-center justify-center text-white h-14 w-14">
          {<feature.logo />}
        </div>
        <CardHeader className="flex justify-center">
          <CardTitle className="text-nowrap text-xl">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <div>{feature.content}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCard;
