import { SearchOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { SearchForm, SearchFormForwardRef } from "./Form";
import { useViewerContext } from "@/components/features/viewer/context";
import { flatMapDeep } from "lodash-es";
import { Result } from "./Result";
import { Martyprs } from "@/types";

import styles from "./search-grave.module.less";
import { getUniqueFromArray, toAntOptions } from "@/utils";

export type SearchGraveParams = {
  keyword?: string;
  col?: number;
  row?: number;
  area?: string;
};

const SearchGrave = () => {
  const { config } = useViewerContext();

  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
  const [result, setResult] = useState<Martyprs[] | undefined>(undefined);

  const searchFormRef = useRef<SearchFormForwardRef>(null);

  const dataFlatten = useMemo(() => {
    const { left, right } = config.data;
    return flatMapDeep([...left, ...right]);
  }, [config]);

  const searchOptions = useMemo(() => {
    const rowOptions = getUniqueFromArray<Martyprs, number>(
      dataFlatten,
      "realPosition.row"
    );
    const colOptions = getUniqueFromArray<Martyprs, number>(
      dataFlatten,
      "realPosition.col"
    );
    const areaOptions = getUniqueFromArray<Martyprs, string>(
      dataFlatten,
      "realPosition.area"
    );

    return {
      rowOptions: toAntOptions(rowOptions),
      colOptions: toAntOptions(colOptions),
      areaOptions: toAntOptions(areaOptions),
    };
  }, [dataFlatten]);

  const closeDrawer = () => {
    setIsOpenSearch(false);
  };

  const openDrawer = () => {
    setIsOpenSearch(true);
  };

  useEffect(() => {
    if (!isOpenSearch) {
      searchFormRef.current?.reset();
      setResult(undefined);
    }
  }, [isOpenSearch]);

  const handleSearch = (value: SearchGraveParams) => {
    const { keyword = "", area, col, row } = value;

    const keyWordLowerCase = keyword.toLowerCase();

    const _result = dataFlatten.filter((item) => {
      const isMatchName = keyWordLowerCase
        ? item.name.toLowerCase().includes(keyWordLowerCase)
        : true;

      const isMatchArea = area ? item.realPosition.area === area : true;

      const isMatchRow = row ? item.realPosition.row === row : true;

      const isMatchCol = col ? item.realPosition.col === col : true;
      
      return isMatchName && isMatchArea && isMatchRow && isMatchCol;
    });
    setResult(_result);
  };

  return (
    <>
      <Button onClick={openDrawer}>
        <SearchOutlined />
      </Button>
      <Drawer
        title="Tìm kiếm"
        className={styles["search-grave-container"]}
        open={isOpenSearch}
        onClose={closeDrawer}
      >
        <div className="sticky top-0 z-10 bg-white">
          <SearchForm
            ref={searchFormRef}
            onSubmit={handleSearch}
            {...searchOptions}
          />
          <hr className="my-3" />
        </div>
        {result && <Result data={result} onClose={closeDrawer} />}
      </Drawer>
    </>
  );
};

export { SearchGrave };
