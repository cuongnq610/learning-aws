import { ELEMENTRY_LIST } from "@/config";
import { DataConfig } from "@/types";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import classNames from "classnames";
import { SetStateAction, useState } from "react";

type ElementryListProps = {
  config?: DataConfig;
  setConfig?: React.Dispatch<SetStateAction<DataConfig>>;
};

const ElementryList = ({ config, setConfig }: ElementryListProps) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);

  const closeDrawer = () => {
    setIsOpenList(false);
  };

  const handleSelectConfig = (_config: DataConfig) => {
    setConfig?.(_config);
    closeDrawer();
  };

  return (
    <>
      <Button size="middle" onClick={() => setIsOpenList(true)}>
        <UnorderedListOutlined />
      </Button>
      <Drawer
        open={isOpenList}
        onClose={closeDrawer}
        title="Danh sách nghĩa trang"
      >
        <div className="flex flex-col gap-3">
          {ELEMENTRY_LIST.map((elementry) => (
            <div
              key={elementry.name}
              onClick={() => handleSelectConfig(elementry)}
              className={classNames(
                "border border-solid border-gray-300 rounded-md p-3 cursor-pointer",
                elementry.name === config?.name
                  ? "border-gray-800"
                  : "border-gray-300"
              )}
            >
              {elementry.name}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export { ElementryList };
