import { useViewerContext } from "../../context";

const ElementryInfo = () => {
  const { config } = useViewerContext();

  return (
    <div className="absolute z-10 top-0 left-0 bg-white shadow-md px-3 py-1 rounded-sm">
      <div>Nghĩa trang liệt sĩ {config.name}</div>
    </div>
  );
};

export { ElementryInfo };
