import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 6,
  totalRows: 12,
};

const rightArea: ElementryArea = {
  totalCols: 6,
  totalRows: 12,
};

export const DinhKeConfig: DataConfig = {
  name: "P.Dĩnh Kế",
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
