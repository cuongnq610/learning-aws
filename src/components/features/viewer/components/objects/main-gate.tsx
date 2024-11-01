import { MAIN_GATE_ID } from "@/consts";
import classNames from "classnames";

type MainGateProps = {
  className?: string;
};

const MainGate = ({ className }: MainGateProps) => {
  return (
    <div
      id={MAIN_GATE_ID}
      className={classNames(
        "bg-[#d0e8d7] flex justify-center items-center py-1 rounded-sm border border-solid border-white",
        className
      )}
    >
      <span>Cổng chính</span>
    </div>
  );
};

export { MainGate };
