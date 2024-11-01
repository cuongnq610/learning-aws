import { DataConfig, ElementryArea } from "@/types";
import { dataLeft1, dataLeft2 } from "./data-left";
import { dataRight1, dataRight2 } from "./data-right";

const leftArea1: ElementryArea = {
  totalCols: 7,
  totalRows: 4,
};

const leftArea2: ElementryArea = {
  totalCols: 7,
  totalRows: 4,
};

const rightArea1: ElementryArea = {
  totalCols: 7,
  totalRows: 4,
};
const rightArea2: ElementryArea = {
  totalCols: 7,
  totalRows: 4,
};

export const DinhTriConfig: DataConfig = {
  name: "Xã Dĩnh Trì",
  layout: {
    left: [leftArea1, leftArea2],
    right: [rightArea1, rightArea2],
  },
  data: {
    left: [dataLeft1, dataLeft2],
    right: [dataRight1, dataRight2],
  },
};
