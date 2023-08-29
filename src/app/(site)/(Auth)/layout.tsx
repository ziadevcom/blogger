import { Box } from "@/utils/@chakraui/wrapper";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto flex min-h-[75vh] w-full flex-col items-center justify-center p-4 md:w-[500px]">
      <Box
        borderColor="border"
        className="flex min-h-[300px] w-full items-center justify-center rounded-md border-[1px] md:min-w-[500px]"
      >
        {children}
      </Box>
    </section>
  );
}
