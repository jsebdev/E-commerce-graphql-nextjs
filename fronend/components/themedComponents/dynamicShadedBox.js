import dynamic from "next/dynamic";

export const DynamicShadedBox = dynamic(() => import("./shadedBox"), {
  ssr: false,
});
