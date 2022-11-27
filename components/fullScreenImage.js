import { myImageLoader } from "helpers/utils";
import React from "react";
import fullScreenImageStyles from "styles/componentsStyles/fullScreenImage.module.scss";

export const FullScreenImage = ({ image, onClose }) => {
  return (
    <div className={fullScreenImageStyles.container} onClick={onClose}>
      <img
        src={myImageLoader({ src: image })}
        className={fullScreenImageStyles.image}
      />
    </div>
  );
};
