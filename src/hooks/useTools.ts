import { Martyprs } from "@/types";
import { flattenDeep } from "lodash-es";
import { useEffect } from "react";

const str = ``;
export const useTools = () => {
  const run = () => {
    const result: Martyprs[] = [];
    const rows = str.split("\n");
    const objByRow: Record<string, Martyprs[]> = {};

    // const b = dataRight.map((item) => {
    //   const [row, col] = item.position.split(".");

    //   const rowNumber = Number(row);
    //   const c = Number(col);

    //   const r = rowNumber % 4 === 0 ? 4 : rowNumber % 4;

    //   return {
    //     ...item,
    //     position: r + "." + c,
    //   };
    // });
    // console.log({ b });

    rows.forEach((data) => {
      const cols = data.split("\t");
      const [
        name,
        no,
        row,
        ,
        ,
        yearOfBirth,
        homeTown,
        militaryPosition,
        deadDate,
      ] = cols;

      const realRow = Number(row);
      const rNumber = 9 - realRow;

      const saveData: Martyprs = {
        name,
        deadDate,
        no: Number(no),
        position: rNumber + "." + 1,
        homeTown,
        militaryPosition,
        realPosition: {
          area: "B",
          row: realRow,
          col: 1,
        },
        yearOfBirth,
      };

      if (objByRow[`${rNumber}`]) {
        const realCol = objByRow[`${rNumber}`].length + 1;
        const col = 11 - realCol;
        saveData.position = rNumber + "." + col;
        saveData.realPosition.col = realCol;
        objByRow[`${rNumber}`].push(saveData);
      } else {
        saveData.position = rNumber + "." + 10;
        saveData.realPosition.col = 1;
        objByRow[`${rNumber}`] = [saveData];
      }
    });

    const a = flattenDeep(Object.values(objByRow));

    console.log({ result, objByRow, a });
  };

  useEffect(() => {
    run();
  }, []);
};
