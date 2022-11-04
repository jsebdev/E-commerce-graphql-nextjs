import React from "react";
import { resetWebsite } from "helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styles from "styles/componentsStyles/header.module.scss";

export const Logo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className={styles.logoContainer}
      onClick={() => resetWebsite(dispatch, router)}
    >
      <Image
        layout="responsive"
        src="/images/store_128.png"
        width={10}
        height={10}
      />
    </div>
  );
};
