import { Position } from "@/types";
import {
  getAppropriateValueInRange,
  getTranformValue,
  getMaxAndMinTranslate,
  getMinScale,
  findNextZoom,
  generateZoomSteps,
  findPrevZoom,
} from "@/utils";
import { useCallback, useRef } from "react";

export type PointInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export const useTransformControl = (targetEl: HTMLElement | null) => {
  const currentTranslateRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  const currentScaleRef = useRef<Position>({
    x: 1,
    y: 1,
  });

  const calculateAndUpdateTranslate = useCallback(
    ({ x, y }: Position, expectScale?: number) => {
      if (!targetEl) return;

      let { x: scaleX, y: scaleY } = currentScaleRef.current;

      if (expectScale) {
        scaleX = expectScale;
        scaleY = expectScale;
      }

      const { maxTranslateX, maxTranslateY, minTranslateX, minTranslateY } =
        getMaxAndMinTranslate(targetEl, scaleX);

      const newTranslateX = getAppropriateValueInRange({
        curr: x / scaleX,
        max: maxTranslateX,
        min: minTranslateX,
      });

      const newTranslateY = getAppropriateValueInRange({
        curr: y / scaleX,
        max: maxTranslateY,
        min: minTranslateY,
      });

      currentScaleRef.current = {
        x: scaleX,
        y: scaleY,
      };

      targetEl.style.transform = `scale(${scaleX}, ${scaleY}) translate(${newTranslateX}px, ${newTranslateY}px)`;
    },
    [targetEl]
  );

  const focusToPoint = useCallback(
    ({ top, left, width, height, scale }: PointInfo & { scale?: number }) => {
      if (!targetEl) return;

      const { translateX, translateY } = getTranformValue(targetEl);

      const viewWidth = window.innerWidth;
      const viewHeight = window.innerHeight;

      const leftFitToCenterPoint = left + width / 2;
      const topFitToCenterPoint = top + height / 2;

      const newTranslateX = translateX - (leftFitToCenterPoint - viewWidth / 2);
      const newTranslateY = translateY - (topFitToCenterPoint - viewHeight / 2);

      calculateAndUpdateTranslate(
        {
          x: newTranslateX,
          y: newTranslateY,
        },
        scale
      );
    },
    [targetEl, calculateAndUpdateTranslate]
  );

  const calculateAndUpdateScale = useCallback(
    (scale: number) => {
      if (!targetEl) return;

      currentScaleRef.current = {
        x: scale,
        y: scale,
      };
      const { x: translateX, y: translateY } = currentTranslateRef.current;

      targetEl.style.transform = `scale(${scale}, ${scale}) translate(${translateX}px, ${translateY}px)`;

      calculateAndUpdateTranslate(
        {
          x: translateX,
          y: translateY,
        },
        scale
      );
    },
    [targetEl, calculateAndUpdateTranslate]
  );

  const focusToElement = useCallback(
    (element: HTMLElement, scale?: number) => {
      const elBound = element.getBoundingClientRect();
      const { left, top, width, height } = elBound;

      focusToPoint({
        top,
        left,
        width,
        height,
        scale,
      });
    },
    [focusToPoint]
  );

  const storeTransformValue = useCallback(() => {
    if (targetEl) {
      // Store current translate values
      const { translateX, translateY, scaleX, scaleY } =
        getTranformValue(targetEl);
      currentTranslateRef.current = {
        x: translateX,
        y: translateY,
      };

      currentScaleRef.current = {
        x: scaleX,
        y: scaleY,
      };
    }
  }, [targetEl]);

  const updateTranslateWhileMoving = useCallback(
    ({ diffX, diffY }: { diffX: number; diffY: number }) => {
      const newTranslateX = currentTranslateRef.current.x + diffX;
      const newTranslateY = currentTranslateRef.current.y + diffY;

      calculateAndUpdateTranslate({
        x: newTranslateX,
        y: newTranslateY,
      });
    },
    [calculateAndUpdateTranslate]
  );

  const handleZoomIn = useCallback(() => {
    if (!targetEl) return;

    const minSteps = getMinScale(targetEl);
    const zoomSteps = generateZoomSteps({
      min: minSteps,
    });

    const newScale = findNextZoom({
      currentStep: currentScaleRef.current.x,
      zoomSteps,
    });

    calculateAndUpdateScale(newScale);
  }, [targetEl, calculateAndUpdateScale]);

  const handleZoomOut = useCallback(() => {
    if (!targetEl) return;
    const minSteps = getMinScale(targetEl);
    const zoomSteps = generateZoomSteps({
      min: minSteps,
    });

    const newScale = findPrevZoom({
      currentStep: currentScaleRef.current.x,
      zoomSteps,
    });
    calculateAndUpdateScale(newScale);
  }, [targetEl, calculateAndUpdateScale]);

  return {
    storeTransformValue,
    handleZoomIn,
    handleZoomOut,
    focusToElement,
    calculateAndUpdateScale,
    calculateAndUpdateTranslate,
    updateTranslateWhileMoving,
  };
};
