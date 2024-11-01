import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 10,
  totalRows: 8,
};

const rightArea: ElementryArea = {
  totalCols: 10,
  totalRows: 8,
};

export const ThoXuongConfig: DataConfig = {
  name: "P.Thọ Xương",
  minWidth: 2000,
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
