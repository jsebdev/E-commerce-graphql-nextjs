import React from "react";
import Image from "next/image";
import headerStyles from "styles/componentsStyles/header.module.scss";
import cartStyles from "styles/componentsStyles/cartIcon.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCartCount } from "store/slices/cartSlice";
import Link from "next/link";
import { createPath } from "helpers/utils";
import { CART_PATH } from "helpers/strings";
import NonSsrWrapper from "./nonSsrWrapper";

export const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  return (
    <Link href={createPath(CART_PATH)}>
      <div
        className={classNames(
          headerStyles.smallHeaderButton,
          cartStyles.cartIcon
        )}
      >
        <Image fill src="/images/cart_128.png" alt="cart" sizes="25vw" />
        {cartCount > 0 && (
          <NonSsrWrapper>
            <div className={cartStyles.cartCounter}>{cartCount}</div>
          </NonSsrWrapper>
        )}
      </div>
    </Link>
  );
};
