import React from "react";
import dynamic from "next/dynamic";
import { Loading } from "./loading";

const ConditionedLoading = ({ children, loading = false }) => {
  return <>{loading ? <Loading /> : <>{children}</>}</>;
};

export const DynamicLoading = dynamic(
  () => Promise.resolve(ConditionedLoading),
  {
    ssr: false,
  }
);
