/// <reference types="vite/client" />
type feature = {
  logo: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  content: string;
};

type RoomDetails = {
  width: number;
  length: number;
  height: number;
};
