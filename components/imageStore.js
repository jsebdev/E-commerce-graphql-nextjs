import { myImageLoader } from "helpers/utils";
import Image from "next/image";
import React from "react";
import imageStoreStyles from "styles/componentsStyles/imageStore.module.scss";

export const ImageStore = ({ image, alt = "image" }) => {
  // useEffect(() => {
  //   console.log("7: image >>>", image);
  // }, [image]);
  return (
    <div className={imageStoreStyles.imageContainer}>
      {image ? (
        // <Image src={myImageLoader({ src: image })} fill objectFit="cover" />
        <Image
          src={myImageLoader({ src: image })}
          // objectFit="cover"
          fill
          alt={alt}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      ) : (
        <Image
          src="/images/no-photo.png"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          // objectFit="cover"
          alt={alt}
        />
      )}
    </div>
  );
};
