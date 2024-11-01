import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 6,
  totalRows: 10,
};

const rightArea: ElementryArea = {
  totalCols: 6,
  totalRows: 10,
};

export const SongKheConfig: DataConfig = {
  name: "Xã Song Khê",
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
