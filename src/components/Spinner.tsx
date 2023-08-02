import { Spinner as ChakraSpinner } from "@/utils/@chakraui/wrapper";

export function Spinner({ text }: { text?: string }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <ChakraSpinner colorScheme="brand" color="brand.400" />
      <p className="text-2xl">{text || "Loading..."}</p>
    </div>
  );
}
