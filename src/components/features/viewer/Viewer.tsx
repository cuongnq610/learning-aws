import { useEffect, useState } from "react";

import { useElementSize, useFingerDetection, useTools } from "@/hooks";
import { DataConfig, Martyprs } from "@/types";
import { DEFAULT_ELEMENTRY, ELEMENTRY_LIST } from "@/config";
import {
  ListGraveArea,
  MainGate,
  ModalGraveInfo,
  TopRightPanel,
} from "./components";
import { ViewerContext } from "./context";
import { ViewerLayout } from "./components/layout/viewer-layout";
import { useParams } from "react-router-dom";
import { toSlug } from "@/utils";

const Viewer = () => {
  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

  const { slug } = useParams();

  const [config, setConfig] = useState<DataConfig>(DEFAULT_ELEMENTRY);
  const { layout, data } = config;

  useElementSize(containerEl, config);

  useEffect(() => {
    const elementry = ELEMENTRY_LIST.find((item) => {
      return slug === toSlug(item.name);
    });

    setConfig(elementry ?? DEFAULT_ELEMENTRY);
  }, [slug]);

  const [selectedGrave, setSelectedGrave] = useState<Martyprs | undefined>(
    undefined
  );
  const [focusingGraves, setFocusingGraves] = useState<Martyprs[]>([]);

  useTools();

  const { focusToMainGate, focusToElement } = useFingerDetection(containerEl);

  useEffect(() => {
    focusToMainGate();
  }, [config, focusToMainGate]);

  return (
    <ViewerLayout>
      <ViewerContext.Provider
        value={{
          config,
          selectedGrave,
          focusingGraves,
          setSelectedGrave,
          setFocusingGraves,
          setConfig,
          focusToElement,
        }}
      >
        <TopRightPanel />

        {selectedGrave && (
          <ModalGraveInfo
            data={selectedGrave}
            onCancel={() => setSelectedGrave(undefined)}
          />
        )}

        <div
          ref={(ref) => setContainerEl(ref)}
          style={{
            backgroundImage: `url(/elementry-background.jpg)`,
          }}
          className="w-full min-h-full bg-[#e3ecbf] bg-contain flex flex-col justify-center"
        >
          <div className="flex justify-center pt-14 text-xl text-red-600 font-semibold uppercase">
            Nghĩa trang liệt sĩ {config.name}
          </div>
          <div className="flex justify-center px-16 pt-10 pb-24 relative">
            <div className="py-5 flex flex-col gap-12">
              {layout.left.map((config, index) => (
                <ListGraveArea
                  key={index}
                  layoutConfig={config}
                  data={data.left[index]}
                />
              ))}
            </div>
            <div className="flex px-4">
              <div className="w-[120px]" />
            </div>
            <div className="py-5 flex flex-col gap-12">
              {layout.right.map((config, index) => (
                <ListGraveArea
                  key={index}
                  layoutConfig={config}
                  data={data.right[index]}
                />
              ))}
            </div>

            <div className="absolute w-[200px] bottom-4">
              <MainGate />
            </div>
          </div>
        </div>
      </ViewerContext.Provider>
    </ViewerLayout>
  );
};

export { Viewer };
