import dynamic from "next/dynamic";

export const DynamicUserChecker = dynamic(() => import("./userChecker"), {
  ssr: false,
});
