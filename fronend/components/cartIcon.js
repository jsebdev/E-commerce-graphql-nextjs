import React from "react";
import Image from "next/image";
import headerStyles from "styles/componentsStyles/header.module.scss";
import cartStyles from "styles/componentsStyles/cart.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { selectCartCount } from "store/slices/cartSlice";
import Link from "next/link";
import { createPath } from "helpers/utils";
import { CART_PATH } from "helpers/strings";

export const CartIcon = () => {
  const cartCount = useSelector(selectCartCount);
  return (
    <div
      className={classNames(
        headerStyles.smallHeaderButton,
        cartStyles.cartIcon
      )}
    >
      <Link href={createPath(CART_PATH)}>
        <Image
          layout="responsive"
          src="/images/cart_128.png"
          width={20}
          height={20}
        />
      </Link>
      {cartCount > 0 && (
        <div className={cartStyles.cartCounter}>{cartCount}</div>
      )}
    </div>
  );
};
