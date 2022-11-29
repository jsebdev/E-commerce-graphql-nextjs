import { Loader, Paper } from "@mantine/core";
import React from "react";
import spinnerStyles from "styles/componentsStyles/spinner.module.scss";

export const Spinner = () => {
  return (
    <Paper className={spinnerStyles.loaderContainer}>
      <Loader variant="oval" size="xl" />
    </Paper>
  );
};
