import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <Image
        src="/blogger-logo.png"
        alt="blogger logo"
        width={70}
        height={70}
      />
    </Link>
  );
}
