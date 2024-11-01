import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 7,
  totalRows: 7,
};

const rightArea: ElementryArea = {
  totalCols: 7,
  totalRows: 7,
};

export const DongSonConfig: DataConfig = {
  name: "Xã Đồng Sơn",
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
