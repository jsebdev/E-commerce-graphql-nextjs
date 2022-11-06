import { Button } from "@mantine/core";
import { CART_PATH } from "helpers/strings";
import { createPath } from "helpers/utils";
import Link from "next/link";
import React from "react";

export const GoToCart = () => {
  return (
    <Link href={createPath(CART_PATH)}>
      <Button variant="outline">Go to cart</Button>
    </Link>
  );
};
