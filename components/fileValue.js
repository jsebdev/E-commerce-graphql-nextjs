import { Box, Group, Text } from "@mantine/core";
import { IconPhoto } from "@tabler/icons";
import { useEffect } from "react";
import React from "react";
import fileValueStyles from "styles/componentsStyles/fileValue.module.scss";
import { ShadedBox } from "./themedComponents/shadedBox";
import { THEMES_NAMES } from "helpers/strings";
import { ImageStore } from "./imageStore";
import classNames from "classnames";
import Image from "next/image";

/**
 * This component is the common frame component for the button and the image
 */
const ImageFrame = ({ children }) => (
  <div className={fileValueStyles.imageFrame}>
    <Box
      className={fileValueStyles.themeBackground}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === THEMES_NAMES.dark
            ? theme.colors.gray[4]
            : theme.colors.white,
      })}
    >
      <ShadedBox className={fileValueStyles.imageContainer} hover={true}>
        {children}
      </ShadedBox>
    </Box>
  </div>
);

function Value({ file }) {
  const reader = new FileReader();
  const [image, setImage] = React.useState(null);
  reader.onload = function (e) {
    setImage(e.target.result);
  };
  useEffect(() => {
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <ImageFrame>
      <>
        {/* <img src={image} alt="image" /> */}
        {image && (
          <Image
            src={image}
            alt="image"
            width="100"
            height="100"
            layout="responsive"
            objectFit="cover"
          />
        )}
      </>
    </ImageFrame>
  );
}

export const FileValue = ({ value }) => {
  // in case of multiple files
  if (Array.isArray(value)) {
    return (
      <Group spacing="sm" py="xs">
        {value.map((file, index) => (
          <Value file={file} key={index} />
        ))}
      </Group>
    );
  }

  return <Value file={value} />;
};

export const FilePlaceholder = ({ savedImage = null }) => {
  return (
    <ImageFrame>
      <div
        className={classNames({
          [fileValueStyles.placeholderContainer]: true,
          [fileValueStyles.iconPlaceholder]: !savedImage,
        })}
      >
        {savedImage ? (
          // <img src={itemImageSource(savedImage)} />
          <ImageStore image={savedImage} />
        ) : (
          <>
            <Text>Upload Image</Text>
            <IconPhoto />
          </>
        )}
      </div>
    </ImageFrame>
  );
};
