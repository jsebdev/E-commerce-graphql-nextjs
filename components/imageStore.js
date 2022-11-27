import { myImageLoader } from "helpers/utils";
import Image from "next/image";
import React from "react";
import imageStoreStyles from "styles/componentsStyles/imageStore.module.scss";

export const ImageStore = ({ image, alt = "image", changeMessage = false }) => {
  return (
    <div className={imageStoreStyles.imageContainer}>
      {changeMessage && (
        <div className={imageStoreStyles.changeMessageContainer}>
          <Image
            src="/images/edit_image_white.png"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            fill
            alt={alt}
          />
        </div>
      )}
      {image ? (
        <img
          className={imageStoreStyles.image}
          src={myImageLoader({ src: image })}
        />
      ) : (
        <Image
          src="/images/no-photo.png"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          alt={alt}
        />
      )}
    </div>
  );
};
