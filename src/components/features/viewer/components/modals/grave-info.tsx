import {
  MAPPING_GRAVE_LABEL_TO_FIELD,
  MAPPING_MOTHER_LABEL_TO_FIELD,
} from "@/consts";
import { Martyprs } from "@/types";
import { Modal, ModalProps } from "antd";
import { get } from "lodash-es";

type ModalGraveInfoProps = {
  data: Martyprs;
} & Pick<ModalProps, "onCancel">;

const ModalGraveInfo = ({ data, onCancel }: ModalGraveInfoProps) => {
  const { realPosition } = data;

  const mappingFields = data.isMother
    ? MAPPING_MOTHER_LABEL_TO_FIELD
    : MAPPING_GRAVE_LABEL_TO_FIELD;

  return (
    <Modal
      open={!!data}
      style={{ top: 20 }}
      title={``}
      maskClosable
      closable
      footer={null}
      onCancel={onCancel}
    >
      <div className="flex flex-col items-center justify-center">
        <img width={80} className="mb-3" src="/emblem_of_vietnam.png" />

        {mappingFields.map((item) => (
          <div
            key={item.field}
            className="w-full max-w-[300px] flex justify-between"
          >
            {item.label}:
            <span className="font-semibold pl-2">
              {get(data, item.field) || "Chưa rõ"}
            </span>
          </div>
        ))}
        <div className="flex justify-between gap-3">
          <p>
            Khu:
            <span className="font-semibold pl-2">{realPosition.area}</span>
          </p>
          <p>
            Hàng số:
            <span className="font-semibold pl-2">{realPosition.row}</span>
          </p>
          <p>
            Mộ số:
            <span className="font-semibold pl-2">{realPosition.col}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export { ModalGraveInfo };
