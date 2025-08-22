import { useEffect, useRef, useState } from "react";
// type UseMeasurementUnitProps = {
//   roomWidth: number;
//   konvaContainerRef: React.RefObject<HTMLDivElement | null>;
// };

export const useMeasurementUnit = (
  roomWidth: number,
  konvaContainerRef: React.RefObject<HTMLDivElement | null>
) => {
  const [measurementUnit, setMeasurementUnit] = useState<number>(1);
  const stagWidth = useRef<number>(undefined);
  useEffect(() => {
    if (!konvaContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        switch (true) {
          case entry.contentRect.width >= 1024:
            setMeasurementUnit((entry.contentRect.width * 0.65) / roomWidth);
            stagWidth.current = entry.contentRect.width;
            break;
          case entry.contentRect.width >= 768:
            setMeasurementUnit((entry.contentRect.width * 0.7) / roomWidth);
            stagWidth.current = entry.contentRect.width;
            break;
          case entry.contentRect.width >= 640:
            setMeasurementUnit((entry.contentRect.width * 0.85) / roomWidth);
            stagWidth.current = entry.contentRect.width;
            break;
          default:
            setMeasurementUnit((entry.contentRect.width * 0.85) / roomWidth);
            stagWidth.current = entry.contentRect.width;
            break;
        }
      }
    });

    observer.observe(konvaContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [roomWidth, stagWidth, konvaContainerRef]);

  return { measurementUnit, stagWidth };
};
