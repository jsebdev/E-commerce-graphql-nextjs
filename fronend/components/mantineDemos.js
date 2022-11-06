import { MediaQuery, Text } from "@mantine/core";
import React from "react";

export function Demo() {
  return (
    <MediaQuery
      query="(max-width: 1200px) and (min-width: 800px)"
      styles={{ fontSize: 20, "&:hover": { backgroundColor: "silver" } }}
    >
      <Text>(max-width: 1200px) and (min-width: 800px) breakpoints</Text>
    </MediaQuery>
  );
}
