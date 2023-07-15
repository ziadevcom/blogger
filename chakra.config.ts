import "@fontsource/syne/400.css";
import "@fontsource/inter/400.css";

import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";

const customTheme = extendTheme(
  {
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Inter', sans-serif`,
    },
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
