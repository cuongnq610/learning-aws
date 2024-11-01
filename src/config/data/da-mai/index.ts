import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 7,
  totalRows: 9,
};

const rightArea: ElementryArea = {
  totalCols: 7,
  totalRows: 9,
};

export const DaMaiConfig: DataConfig = {
  name: "P.Đa Mai",
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
