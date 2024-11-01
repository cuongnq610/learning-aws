export const convertIndexToPosition = (index: number, totalCols: number) => {
  const startPosition = 1;
  const intergerPart = parseInt(`${index / totalCols}`);
  const decimalPart = index % totalCols;

  const col = decimalPart + startPosition;
  const row = intergerPart + startPosition;

  return `${row}.${col}`;
};
