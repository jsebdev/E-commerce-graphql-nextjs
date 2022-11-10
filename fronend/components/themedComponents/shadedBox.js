import { Box } from "@mantine/core";
import React from "react";

export const ShadedBox = ({ children, className }) => {
  return (
    <Box
      className={className}
      sx={(theme) => ({
        boxShadow: ` 2px 2px 5px 3px ${
          theme.colorScheme === "dark"
            ? theme.colors.gray[7]
            : theme.colors.gray[2]
        }`,
      })}
    >
      {children}
    </Box>
  );
};

// export const ShadedBox = React.forwardRef(({ children, className }, ref) => {
//   return (
//     <Box
//       ref={ref}
//       className={className}
//       sx={(theme) => ({
//         boxShadow: ` 1px 1px 2px 1px ${
//           theme.colorScheme === "dark"
//             ? theme.colors.gray[7]
//             : theme.colors.dark[0]
//         }`,
//       })}
//     >
//       {children}
//     </Box>
//   );
// });

// ShadedBox.displayName = "ShadedBox";
