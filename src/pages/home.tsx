import { ELEMENTRY_LIST } from "@/config";
import { APP_ROUTER } from "@/consts";
import { DataConfig } from "@/types";
import { toSlug } from "@/utils";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleClickElementry = (elementry: DataConfig) => {
    const slug = toSlug(elementry.name);

    const url = APP_ROUTER.ELEMENTRY_DETAIL.replace(":slug", slug);
    navigate(url);
  };

  return (
    <div
      className="w-screen bg-cover bg-center-bottom"
      style={{
        backgroundImage: `url('/home-banner.jpg')`,
        height: window.innerHeight,
      }}
    >
      <div className="flex justify-center gap-3 w-full pt-10">
        <img className="h-[62px]" src="/logo_doan.png" />
        <img className="h-[60px]" src="/logo_hoi.png" />
        <img className="h-[62px]" src="/logo_doi.png" />
      </div>
      <div className="text-center text-white text-sm font-bold mt-2 uppercase">
        THÀNH PHỐ BẮC GIANG
      </div>

      <div className="text-center pt-10">
        <div className="text-red-700 text-4xl font-bold uppercase">
          CÔNG TRÌNH
        </div>
        <div className="text-white text-2xl font-bold uppercase">
          SỐ HOÁ NGHĨA TRANG LIỆT SĨ
        </div>
      </div>

      <fieldset className="mx-auto border-[4px] rounded-3xl border-solid border-white mt-4 max-w-[360px]">
        <legend className="text-center text-yellow-300 text-base font-semibold px-2">
          CÁC NGHĨA TRANG LIỆT SĨ
        </legend>
        <div className="flex flex-wrap p-2">
          {ELEMENTRY_LIST.map((elementry) => (
            <div
              key={elementry.name}
              onClick={() => handleClickElementry(elementry)}
              className={classNames("w-1/2 p-2 flex justify-center")}
            >
              <div
                className={classNames(
                  "w-full px-2 py-1 rounded-md cursor-pointer",
                  "border border-solid border-white",
                  "text-white text-center uppercase font-bold text-sm"
                )}
              >
                {elementry.name}
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
