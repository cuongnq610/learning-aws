import { DataConfig, ElementryArea } from "@/types";
import { dataLeft } from "./data-left";
import { dataRight } from "./data-right";

const leftArea: ElementryArea = {
  totalCols: 8,
  totalRows: 7,
};

const rightArea: ElementryArea = {
  totalCols: 8,
  totalRows: 7,
};

export const HoangVanThuConfig: DataConfig = {
  name: "P.Hoàng Văn Thụ",
  minWidth: 1400,
  layout: {
    left: [leftArea],
    right: [rightArea],
  },
  data: {
    left: [dataLeft],
    right: [dataRight],
  },
};
