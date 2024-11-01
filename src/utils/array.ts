import { SelectProps } from "antd";
import { get } from "lodash-es";

export const convertDataToObject = <T = unknown>(
  data: T[],
  keyField: string
) => {
  const result: Record<string, T> = {};

  data.forEach((item) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const key = (item as any)[keyField];
    result[key] = item;
  });

  return result;
};

export const getUniqueFromArray = <InputType, ReturnType>(
  data: Array<InputType>,
  key: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const objResult: Record<string, ReturnType> = {};

  data.forEach((item) => {
    const value = get(item, key);

    if (!objResult[`${value}`]) {
      objResult[`${value}`] = value;
    }
  });

  return Object.values(objResult);
};

export const toAntOptions = <T extends string | number>(data: T[]) => {
  const result: SelectProps["options"] = data.map((item) => ({
    value: item,
    label: `${item}`,
  }));

  return result;
};
