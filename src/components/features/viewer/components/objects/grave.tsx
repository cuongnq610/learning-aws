import { Martyprs } from "@/types";
import { generateElementId } from "@/utils";
import classNames from "classnames";

type GraveProps = {
  data: Martyprs;
  isFocus?: boolean;
  onClick?: (data: Martyprs) => void;
};

const Grave = ({ data, isFocus, onClick }: GraveProps) => {
  const handleClick = () => {
    if (data) {
      onClick?.(data);
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col justify-between bg-[#66a1d1] shadow-sm",
        "w-[60px] h-[80px] rounded-sm py-1 cursor-pointer",
        "border-2 border-solid",
        isFocus ? "bg-white border-[#66a1d1]" : "border-white bg-[#66a1d1]"
      )}
      id={generateElementId(data)}
      onClick={handleClick}
      style={{ fontSize: 10 }}
    >
      <div className="text-xs text-center font-semibold">{data.name}</div>
      <div className="text-center">{data.deadDate}</div>
    </div>
  );
};

export { Grave };
