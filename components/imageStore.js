import { myImageLoader } from "helpers/utils";
import Image from "next/image";
import React, { useEffect } from "react";

export const ImageStore = ({ image }) => {
  useEffect(() => {
    console.log("7: image >>>", image);
  }, [image]);
  return image ? (
    <Image
      loader={myImageLoader}
      src={image}
      layout="responsive"
      width="100"
      height="100"
      objectFit="cover"
    />
  ) : (
    <Image
      src="/images/no-photo.png"
      layout="responsive"
      width="100"
      height="100"
      objectFit="cover"
    />
  );
};
