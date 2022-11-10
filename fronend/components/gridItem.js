import Image from "next/image";
import React from "react";
import { Box, Group, Title } from "@mantine/core";
import gridItemStyles from "styles/componentsStyles/gridItem.module.scss";
import { ShadedBox } from "./themedComponents/shadedBox";
import Link from "next/link";
import { createPath } from "helpers/utils";
import { ITEM_DISPLAY_PATH, OWN_ITEM_PATH } from "helpers/strings";

// export const GridItem = React.forwardRef(({ item }, ref) => {
//   return (
//     <div ref={ref}>
//       <ShadedBox className={gridItemStyles.gridItem}>
//         <div className={gridItemStyles.imageContainer}>
//           <Image
//             className={gridItemStyles.itemImage}
//             src="/images/profile.jpg"
//             layout="responsive"
//             width={1}
//             height={1}
//           />
//         </div>
//         <Group position="apart" align="self-start">
//           <Box className={gridItemStyles.titlesBox}>
//             <Link href="/login">
//               <h3>{item.title}</h3>
//             </Link>
//             {item.subtitle && <h4>{item.subtitle}</h4>}
//           </Box>
//           <Title order={5} color="grape.9">
//             ${item.price}
//           </Title>
//         </Group>
//         <div className={gridItemStyles.descriptionContainer}>
//           <p>{item.description}</p>
//         </div>
//       </ShadedBox>
//     </div>
//   );
// });

export const GridItem = ({ item, inHome }) => {
  const itemPath = inHome
    ? createPath(ITEM_DISPLAY_PATH(item.id))
    : createPath(OWN_ITEM_PATH(item.id));
  return (
    <Box className={gridItemStyles.gridItemContainer}>
      <ShadedBox className={gridItemStyles.gridItem}>
        <Link key={item.id} href={itemPath}>
          <div className={gridItemStyles.imageContainer}>
            <Image
              className={gridItemStyles.itemImage}
              src="/images/profile.jpg"
              layout="responsive"
              width={1}
              height={1}
            />
          </div>
        </Link>
        <Group position="apart" align="self-start">
          <Box className={gridItemStyles.titlesBox}>
            <h3>{item.title}</h3>
            {item.subtitle && <h4>{item.subtitle}</h4>}
          </Box>
          <Title order={5} color="grape.9">
            ${item.price}
          </Title>
        </Group>
        <div className={gridItemStyles.descriptionContainer}>
          <p>{item.description}</p>
        </div>
      </ShadedBox>
    </Box>
  );
};
