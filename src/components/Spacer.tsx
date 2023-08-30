import { Box } from "@/utils/@chakraui/wrapper";

export function Spacer({ space }: { space: number }) {
  return <Box paddingY={space}> </Box>;
}
