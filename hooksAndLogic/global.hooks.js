import { useEffect, useState } from "react";

export const getWindowSize = () => {
  if (typeof window !== "undefined") {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  // return { width: 0, height: 0 };
  return {};
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize(getWindowSize()));

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return { windowSize };
};
