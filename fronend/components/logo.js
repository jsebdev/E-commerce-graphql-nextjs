import Image from "next/image";
import styles from "./header.module.scss";

export const Logo = () => {
  return (
    <div className={styles.headerItem}>
      <div className={styles.logoContainer}>
        <Image
          layout="responsive"
          src="/images/store_128.png"
          width={10}
          height={10}
        />
      </div>
    </div>
  );
};
