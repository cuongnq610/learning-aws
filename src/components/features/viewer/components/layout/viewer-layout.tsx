import { SIDE_BAR_HEIGHT } from "@/consts";
import { PropsWithChildren } from "react";

type ViewerLayoutProps = PropsWithChildren;

const ViewerLayout = ({ children }: ViewerLayoutProps) => {
  return (
    <div
      className="w-screen bg-gray-400 relative overflow-hidden"
      style={{ height: window.innerHeight - SIDE_BAR_HEIGHT }}
    >
      <div className="absolute top-0 left-0 z-10">
        <img src="/border-top-left.png" className="w-12" />
      </div>
      {children}
      <div className="absolute bottom-0 right-0 z-10">
        <img src="/border-bottom-right.png" className="w-12" />
      </div>
    </div>
  );
};

export { ViewerLayout };
