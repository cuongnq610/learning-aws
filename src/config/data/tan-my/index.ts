import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 4,
  totalRows: 11,
};

const rightArea: ElementryArea = {
  totalCols: 4,
  totalRows: 11,
};

export const TanMyConfig: DataConfig = {
  name: "Xã Tân Mỹ",
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
