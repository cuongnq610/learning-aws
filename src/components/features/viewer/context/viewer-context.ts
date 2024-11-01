import { DEFAULT_ELEMENTRY } from "@/config";
import { DataConfig, Martyprs } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type ViewerContextType = {
  config: DataConfig;
  selectedGrave: Martyprs | undefined;
  focusingGraves: Martyprs[];
  setFocusingGraves: Dispatch<SetStateAction<Martyprs[]>>;
  focusToElement: (el: HTMLElement, scale?: number) => void;
  setConfig: Dispatch<SetStateAction<DataConfig>>;
  setSelectedGrave: Dispatch<SetStateAction<Martyprs | undefined>>;
};

export const ViewerContext = createContext<ViewerContextType>({
  config: DEFAULT_ELEMENTRY,
  selectedGrave: undefined,
  focusingGraves: [],
  setSelectedGrave: () => {},
  focusToElement: () => {},
  setConfig: () => {},
  setFocusingGraves: () => {},
});

export const useViewerContext = () => useContext(ViewerContext);
