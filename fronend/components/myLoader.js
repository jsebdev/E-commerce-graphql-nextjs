import { Loader, Paper } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoading } from "store/slices/loaderSlice";
import myLoaderStyles from "styles/componentsStyles/myLoader.module.scss";

// const printRoutes = (url, pathname) => {
//   console.log("las rutas son:");
//   console.log(url);
//   console.log(pathname);
// };

export const MyLoader = () => {
  const router = useRouter();
  const loading = useSelector(selectLoading);
  const [changingUrl, setChangingUrl] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setChangingUrl(true);
    };
    const handleComplete = () => {
      setChangingUrl(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);
  if (!loading && !changingUrl) return null;
  return (
    <Paper className={myLoaderStyles.loaderContainer}>
      <Loader variant="oval" size="xl" />
    </Paper>
  );
};
