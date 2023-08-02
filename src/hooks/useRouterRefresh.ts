import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRouterRefresh() {
  const router = useRouter();

  useEffect(() => {
    console.log("Refreshing router");
    router.refresh();
  }, [router]);

  return () => router.refresh();
}
