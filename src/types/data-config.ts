import { ElementryArea } from "./elementry";
import { Martyprs } from "./martyprs";

export type DataConfig = {
  name: string;
  minWidth?: number;
  layout: {
    left: ElementryArea[];
    right: ElementryArea[];
  };
  data: {
    left: Array<Martyprs[]>;
    right: Array<Martyprs[]>;
  };
};
