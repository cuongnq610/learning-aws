import { DEFAULT_MIN_WIDTH, SIDE_BAR_HEIGHT } from "@/consts";
import { DataConfig } from "@/types";
import { useCallback, useEffect } from "react";

const useElementSize = (targetEl: HTMLElement | null, config: DataConfig) => {
  const calculateSize = useCallback(() => {
    if (!targetEl) return;

    const { innerWidth: vw, innerHeight: vh } = window;
    const ratio = vw / (vh - SIDE_BAR_HEIGHT);

    const minWidth = config.minWidth ?? DEFAULT_MIN_WIDTH;

    const elWidth = Math.max(vw, minWidth);
    const elHeight = elWidth / ratio;

    targetEl.style.height = elHeight + "px";
    targetEl.style.width = elWidth + "px";
  }, [targetEl, config]);

  useEffect(() => {
    calculateSize();
  }, [calculateSize]);
};

export { useElementSize };
