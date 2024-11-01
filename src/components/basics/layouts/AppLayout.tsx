import { Layout } from "antd";
import { PropsWithChildren } from "react";

type AppLayoutProps = PropsWithChildren;

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Layout>
      <Layout.Header className="flex h-16 bg-[#00460f] px-6 sm:px-10">
        <div
          className="w-full h-full"
          style={{ background: "url(/bg-header-opacity.png" }}
        >
          <div className="flex items-center h-full py-3 gap-3">
            <img className="h-11" src="/logo_doan.png" />
            <img className="h-10" src="/logo_hoi.png" />
            <img className="h-11" src="/logo_doi.png" />
            <div className="text-sm sm:text-2xl text-white font-bold">
              THÀNH PHỐ BẮC GIANG
            </div>
          </div>
          <div>Menu</div>
        </div>
      </Layout.Header>

      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export { AppLayout };
