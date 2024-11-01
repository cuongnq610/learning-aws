import classNames from "classnames";
import { Grave } from "./grave";
import styles from "./list-grave-area.module.less";
import { ElementryArea, Martyprs } from "@/types";
import { CSSProperties, useMemo } from "react";
import { convertDataToObject, convertIndexToPosition } from "@/utils";
import { useViewerContext } from "../../context";

type ListGraveAreaProps = {
  layoutConfig: ElementryArea;
  data: Martyprs[];
  className?: string;
};

const ListGraveArea = ({
  layoutConfig,
  data,
  className,
}: ListGraveAreaProps) => {
  const { setSelectedGrave, focusingGraves } = useViewerContext();

  const { totalRows, totalCols } = layoutConfig;
  const totalItems = totalRows * totalCols;

  const dataObject = useMemo(() => {
    return convertDataToObject(data, "position");
  }, [data]);

  const gridStyles = useMemo<CSSProperties>(() => {
    return {
      gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))`,
    };
  }, [totalRows, totalCols]);

  return (
    <div
      style={gridStyles}
      className={classNames(styles["list-grave-area"], className)}
    >
      {[...new Array(totalItems)].map((_item, index) => {
        const position = convertIndexToPosition(index, totalCols);
        const itemData = dataObject[position];
        const isFocus = focusingGraves.some(
          (item) =>
            item.position === itemData?.position && item.name === itemData?.name
        );

        return (
          <div key={position}>
            {itemData && (
              <Grave
                data={itemData}
                isFocus={isFocus}
                onClick={setSelectedGrave}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export { ListGraveArea };
