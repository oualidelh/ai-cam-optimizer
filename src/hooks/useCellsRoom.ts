import { useMemo } from "react";

type UseRoomCellsProps = {
  roomDetails: RoomDetails;
  measurementUnit: number;
};

export const useRoomCells = ({
  roomDetails,
  measurementUnit,
}: UseRoomCellsProps) => {
  const cells = useMemo(() => {
    function roomCells(): CellsArray {
      const cellSize = 2;
      const cellWidth = cellSize;
      const cellLength = cellSize;
      const numberOfXCells =
        //  Math.round(
        (roomDetails.roomWidth * measurementUnit) / cellWidth;
      // );
      const numberOfYCells =
        // Math.round(
        (roomDetails.roomLength * measurementUnit) / cellLength;
      // );

      const cellsArray: CellsArray = [];

      for (let i = 0; i < numberOfXCells; i++) {
        for (let j = 0; j < numberOfYCells; j++) {
          cellsArray.push({
            x: i * cellWidth + 20,
            y: j * cellLength + 20,
            stroke: "rgba(236, 236, 236, 0.8)",
            width: cellSize,
            height: cellSize,
            strokeWidth: 1,
          });
        }
      }

      return cellsArray;
    }
    return roomCells();
  }, [measurementUnit, roomDetails.roomLength, roomDetails.roomWidth]);

  return cells;
};
