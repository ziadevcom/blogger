import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  {
    components: {
      Button: {
        defaultProps: { variant: "solid" },
      },
    },
    colors: {
      brand: baseTheme.colors.green,
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  })
);

export { customTheme as theme };
