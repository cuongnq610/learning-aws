import { MAX_ZOOM, ZOOM_STEP } from "@/consts";

/**
 * Generate zoom steps from 0 to max
 */
export const generateDefaultZoomSteps = ({
  max = MAX_ZOOM,
  step = ZOOM_STEP,
}: {
  max: number;
  step: number;
}) => {
  const result = [];
  for (let i = 0; i <= max; i += step) {
    result.push(i);
  }

  return result;
};

export const generateZoomSteps = ({
  max = MAX_ZOOM,
  min,
  step = ZOOM_STEP,
}: {
  min: number;
  max?: number;
  step?: number;
}) => {
  const parentSteps = generateDefaultZoomSteps({ max, step });

  const result = [min];
  parentSteps.forEach((item) => {
    if (item > min) {
      result.push(item);
    }
  });

  return result;
};

export const findNextZoom = ({
  zoomSteps,
  currentStep,
}: {
  zoomSteps: number[];
  currentStep: number;
}) => {
  const currentIndex = zoomSteps.findIndex(
    (item) => Number(item.toFixed(2)) === Number(currentStep.toFixed(2))
  );

  if (currentIndex + 1 === zoomSteps.length) {
    return currentStep;
  }

  return zoomSteps[currentIndex + 1];
};

export const findPrevZoom = ({
  zoomSteps,
  currentStep,
}: {
  zoomSteps: number[];
  currentStep: number;
}) => {
  const currentIndex = zoomSteps.findIndex(
    (item) => Number(item.toFixed(2)) === Number(currentStep.toFixed(2))
  );

  if (currentIndex === 0) {
    return currentStep;
  }

  return zoomSteps[currentIndex - 1];
};
