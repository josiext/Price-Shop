import { extendTheme } from "@chakra-ui/react";

export const COLORS = {
  PRIMARY: "#14213D",
  SECONDARY: "#FCA311",
};

export const theme = extendTheme({
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "secondary",
        },
      },
    },
  },
});
