import dynamic from "next/dynamic";

export const DynamicShadedBox = dynamic(() => import("./coloredBox"), {
  ssr: false,
});
