import { MAIN_GATE_ID } from "@/consts";
import {
  calculateTouchedDistance,
  detectZoomOrMove,
  getMinScale,
} from "@/utils";
import { useCallback, useEffect, useRef } from "react";
import { useTransformControl } from "./useTransformControl";

const useFingerDetection = (targetEl: HTMLElement | null) => {
  const {
    handleZoomIn,
    focusToElement,
    handleZoomOut,
    calculateAndUpdateScale,
    calculateAndUpdateTranslate,
    storeTransformValue,
    updateTranslateWhileMoving,
  } = useTransformControl(targetEl);

  const touchedDistanceRef = useRef<number>(0);

  const currentMousePostionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const currentPositionRef = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const isHoldMouseRef = useRef<boolean>(false);

  const resetTranslate = useCallback(
    (scale?: number) => {
      calculateAndUpdateTranslate(
        {
          x: 0,
          y: 0,
        },
        scale
      );
    },
    [calculateAndUpdateTranslate]
  );

  const resetScale = useCallback(
    (scale?: number) => {
      calculateAndUpdateScale(scale ?? 1);
    },
    [calculateAndUpdateScale]
  );

  const focusToMainGate = useCallback(() => {
    if (!targetEl) return;
    const mainGateEl = document.getElementById(MAIN_GATE_ID);

    if (mainGateEl) {
      const minScale = getMinScale(targetEl);
      resetTranslate(minScale);
      focusToElement(mainGateEl, minScale);
    }
  }, [targetEl, focusToElement, resetTranslate]);

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      const { isMoving, isZooming } = detectZoomOrMove(event);

      if (isMoving) {
        // Store current position
        currentPositionRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        };
      }

      if (isZooming) {
        touchedDistanceRef.current = calculateTouchedDistance(event);
      }

      if (targetEl) {
        storeTransformValue();
      }
    },
    [targetEl, storeTransformValue]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      const { isMoving, isZooming } = detectZoomOrMove(event);
      if (isMoving) {
        const { clientX, clientY } = event.touches[0];

        const differentInX = clientX - currentPositionRef.current.x;
        const differentInY = clientY - currentPositionRef.current.y;

        updateTranslateWhileMoving({
          diffX: differentInX,
          diffY: differentInY,
        });
      }

      if (isZooming) {
        const currTouchedDistance = calculateTouchedDistance(event);
        const isZoomIn = currTouchedDistance > touchedDistanceRef.current;
        const isZoomOut = currTouchedDistance < touchedDistanceRef.current;

        if (isZoomIn) {
          handleZoomIn();
        }

        if (isZoomOut) {
          handleZoomOut();
        }
        console.log({ isZoomIn, isZoomOut });
      }
    },
    [handleZoomIn, handleZoomOut, updateTranslateWhileMoving]
  );

  const handleTouchEnd = useCallback(() => {
    storeTransformValue();
  }, [storeTransformValue]);

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      // Store current position
      currentMousePostionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      isHoldMouseRef.current = true;

      // Store current translate values
      storeTransformValue();
    },
    [storeTransformValue]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isHoldMouseRef.current) return;

      const { clientX, clientY } = event;

      const differentInX = clientX - currentMousePostionRef.current.x;
      const differentInY = clientY - currentMousePostionRef.current.y;

      updateTranslateWhileMoving({
        diffX: differentInX,
        diffY: differentInY,
      });
    },
    [updateTranslateWhileMoving]
  );

  const handleMouseUp = useCallback(() => {
    storeTransformValue();
    isHoldMouseRef.current = false;
  }, [storeTransformValue]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY < 0) {
        handleZoomIn();
      }

      if (e.deltaY > 0) {
        handleZoomOut();
      }
    },
    [handleZoomIn, handleZoomOut]
  );

  useEffect(() => {
    if (!targetEl) return;

    targetEl.addEventListener("touchstart", handleTouchStart);
    targetEl.addEventListener("touchmove", handleTouchMove);
    targetEl.addEventListener("touchend", handleTouchEnd);

    targetEl.addEventListener("mousedown", handleMouseDown);
    targetEl.addEventListener("mousemove", handleMouseMove);
    targetEl.addEventListener("mouseup", handleMouseUp);

    targetEl.addEventListener("wheel", handleWheel);

    return () => {
      targetEl.removeEventListener("touchstart", handleTouchStart);
      targetEl.removeEventListener("touchmove", handleTouchMove);
      targetEl.removeEventListener("touchend", handleTouchEnd);

      targetEl.removeEventListener("mousedown", handleMouseDown);
      targetEl.removeEventListener("mousemove", handleMouseMove);
      targetEl.removeEventListener("mouseup", handleMouseUp);
      targetEl.removeEventListener("wheel", handleWheel);
    };
  }, [
    targetEl,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  ]);

  return {
    focusToMainGate,
    focusToElement,
    resetTranslate,
    resetScale,
  };
};

export { useFingerDetection };
