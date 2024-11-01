import { useViewerContext } from "@/components/features/viewer/context";
import {
  MAPPING_GRAVE_LABEL_TO_FIELD,
  MAPPING_MOTHER_LABEL_TO_FIELD,
} from "@/consts";
import { Martyprs } from "@/types";
import { generateElementId } from "@/utils";
import { Button } from "antd";
import classNames from "classnames";
import { get } from "lodash-es";

type ResultProps = {
  data: Martyprs[];
  onClose?: () => void;
};

const Result = ({ data, onClose }: ResultProps) => {
  const { focusToElement, setFocusingGraves } = useViewerContext();

  const handleClickItem = (item: Martyprs) => {
    const targetId = generateElementId(item);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      setFocusingGraves([item]);
      focusToElement(targetEl);
    }

    onClose?.();
  };

  if (data.length === 0) {
    return <div className="text-xl font-semibold">Không có kết quả</div>;
  }

  return (
    <div className="px-6">
      <div className="flex justify-between items-center my-2">
        <div className="text-xl font-semibold">Kết quả tìm kiếm</div>
        <div>Có {data.length} kết quả</div>
      </div>
      {data.map((item) => {
        const mappingFields = item.isMother
          ? MAPPING_MOTHER_LABEL_TO_FIELD
          : MAPPING_GRAVE_LABEL_TO_FIELD;
        return (
          <div
            key={item.name}
            className={classNames(
              "py-3 flex justify-between items-center",
              "border-b border-solid border-gray-300 last:border-none"
            )}
          >
            <div>
              {mappingFields.map((lf) => (
                <p key={lf.field}>
                  {lf.label} &nbsp;
                  <span className="font-semibold">
                    {get(item, lf.field) || "Chưa rõ"}
                  </span>
                </p>
              ))}
              <div className="flex gap-3">
                <p>
                  Khu: &nbsp;
                  <span className="font-semibold">
                    {item.realPosition.area}
                  </span>
                </p>
                <p>
                  Hàng số: &nbsp;
                  <span className="font-semibold">{item.realPosition.row}</span>
                </p>
                <p>
                  Mộ số: &nbsp;
                  <span className="font-semibold">{item.realPosition.col}</span>
                </p>
              </div>
            </div>
            <Button onClick={() => handleClickItem(item)}>Đi tới</Button>
          </div>
        );
      })}
    </div>
  );
};

export { Result };
