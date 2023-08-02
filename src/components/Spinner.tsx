import { Spinner as ChakraSpinner } from "@/utils/@chakraui/wrapper";

export function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <ChakraSpinner colorScheme="brand" color="brand.400" />
      <p className="text-2xl">Loading...</p>
    </div>
  );
}
