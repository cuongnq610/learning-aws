import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 5,
  totalRows: 15,
};

const rightArea: ElementryArea = {
  totalCols: 5,
  totalRows: 15,
};

export const TanTienConfig: DataConfig = {
  name: "Xã Tân Tiến",
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
