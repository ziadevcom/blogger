import "@fontsource/syne/400.css";
import "@fontsource/inter/400.css";

import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
  StyleFunctionProps,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  {
    semanticTokens: {
      colors: {
        border: {
          default: "gray.300",
          _dark: "gray.700",
        },
        container: {
          default: "white",
          _dark: "gray.800",
        },
      },
    },
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Inter', sans-serif`,
    },
    components: {
      Button: {
        defaultProps: { variant: "solid" },
      },
      Container: {
        defaultProps: { maxW: "container.xl" },
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
