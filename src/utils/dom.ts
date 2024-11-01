import { Martyprs } from "@/types";

export const generateElementId = (data: Martyprs) => {
  return data.position + "_" + data.name;
};

/**
 * Get tranform styles of this element (translate, scale,...)
 */
export const getTranformValue = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return {
    translateX: matrix.m41,
    translateY: matrix.m42,
    scaleX: matrix.m11,
    scaleY: matrix.m22,
  };
};

/**
 * Calculate distance betwwen 2 fingers touched to determine if the user want to zoom in or out
 */
export const calculateTouchedDistance = (event: TouchEvent) => {
  const touches = event.touches;
  const diffX = touches[0].clientX - touches[1].clientX;
  const diffY = touches[0].clientY - touches[1].clientY;
  return Math.hypot(diffX, diffY);
};

/**
 * Observe the user's finger to determine what the user wants to do (move or change zoom)
 */
export const detectZoomOrMove = (event: TouchEvent) => {
  const touches = event.touches;
  const isMoving = touches.length < 2;
  const isZooming = touches.length >= 2;
  return {
    isZooming,
    isMoving,
  };
};

export const getBoundaryInfo = (targetEl: HTMLElement) => {
  return targetEl.getBoundingClientRect();
};

export const getScaledDimension = (targetEl: HTMLElement) => {
  const { scaleX, scaleY } = getTranformValue(targetEl);
  const bound = getBoundaryInfo(targetEl);
  const widthScaled = (bound.width * (scaleX - 1)) / scaleX;
  const heightScaled = (bound.height * (scaleY - 1)) / scaleY;

  return {
    widthScaled,
    heightScaled,
  };
};

/**
 * Calculate maximum and minimum translate value to ensure the element does not exceed the parent boundary
 */
export const getMaxAndMinTranslate = (
  targetEl: HTMLElement,
  expectScale?: number
) => {
  let { scaleX, scaleY } = getTranformValue(targetEl);

  if (expectScale) {
    scaleX = expectScale;
    scaleY = expectScale;
  }

  const bound = getBoundaryInfo(targetEl);
  const parentBound = targetEl.parentElement
    ? getBoundaryInfo(targetEl.parentElement)
    : null;

  if (!parentBound)
    return {
      maxTranslateX: 0,
      minTranslateX: 0,
      maxTranslateY: 0,
      minTranslateY: 0,
    };

  const { widthScaled, heightScaled } = getScaledDimension(targetEl);

  const subWidth = widthScaled / 2;
  const subHeight = heightScaled / 2;

  const widthDifference = bound.width - parentBound.width - subWidth;
  const heightDifference = bound.height - parentBound.height - subHeight;

  const maxTranslateX = subWidth / scaleX;
  const minTranslateX = -widthDifference / scaleX;

  const maxTranslateY = subHeight / scaleY;
  const minTranslateY = -heightDifference / scaleY;

  const result = {
    maxTranslateX: Math.max(maxTranslateX, minTranslateX),
    minTranslateX: Math.min(maxTranslateX, minTranslateX),
    maxTranslateY: Math.max(maxTranslateY, minTranslateY),
    minTranslateY: Math.min(maxTranslateY, minTranslateY),
  };

  return result;
};

export const getMinScale = (targetEl: HTMLElement) => {
  const { scaleX, scaleY } = getTranformValue(targetEl);

  const bound = getBoundaryInfo(targetEl);
  const parentBound = targetEl.parentElement
    ? getBoundaryInfo(targetEl.parentElement)
    : null;

  if (!parentBound) {
    return 1;
  }

  const realWidth = bound.width / scaleX;
  const realHeight = bound.height / scaleY;

  const widthRatio = parentBound.width / realWidth;
  const heightRatio = parentBound.height / realHeight;

  return Math.max(widthRatio, heightRatio);
};

/**
 *  Get appropriate value in range, return maximum or minimum value when current value is out of the range
 */
export const getAppropriateValueInRange = ({
  curr,
  max,
  min,
}: {
  curr: number;
  max: number;
  min: number;
}) => {
  let result = curr;
  result = Math.min(max, result);
  result = Math.max(min, result);
  return result;
};
