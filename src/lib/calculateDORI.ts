export function calculateDORI(
  focalLengthMm: number,
  horizontalPixels: number,
  sensorSizeLabel: string // e.g., "1/2.8"
): Record<string, number> {
  const sensorWidthMap: Record<string, number> = {
    "1/2.8": 5.6,
    "1/2.7": 5.37,
    "1/2.5": 5.76,
    "1/3": 4.8,
    "1/4": 3.6,
  };

  const sensorWidthMm = sensorWidthMap[sensorSizeLabel];
  if (!sensorWidthMm) throw new Error("Unknown sensor size");

  const hfovRad = 2 * Math.atan(sensorWidthMm / (2 * focalLengthMm));
  const hfovDeg = (hfovRad * 180) / Math.PI;
  const hFovPerMeter = 2 * Math.tan(hfovRad / 2);

  const levels = {
    Detect: 25,
    Observe: 63,
    Recognize: 125,
    Identify: 250,
  };

  const result: Record<string, number> = {
    hfovDeg: parseFloat(hfovDeg.toFixed(1)),
  };

  for (const [label, ppm] of Object.entries(levels)) {
    const distance = horizontalPixels / (ppm * hFovPerMeter);
    result[label] = parseFloat(distance.toFixed(1));
  }

  return result;
}
