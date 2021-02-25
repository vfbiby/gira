import { ReactNode } from "react";
import { Spin } from "antd";

export const FullPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
};

export const ParentFullPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative inset-0 flex items-center justify-center w-full h-full">
      {children}
    </div>
  );
};

export const FullPageSpinner = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <div className="text-6xl text-red-700">{error?.message}</div>
    </FullPage>
  );
};
