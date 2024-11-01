import { ElementryList } from "./ElementryList";
import { SearchGrave } from "./search-grave";
import { useViewerContext } from "../../../context";

const TopRightPanel = () => {
  const { config, setConfig } = useViewerContext();

  return (
    <div className="absolute top-3 right-3 z-10">
      <div className="flex flex-col gap-2">
        <ElementryList config={config} setConfig={setConfig} />
        <SearchGrave />
      </div>
    </div>
  );
};

export { TopRightPanel };
