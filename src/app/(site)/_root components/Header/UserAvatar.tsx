import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Avatar,
  PopoverCloseButton,
  Stack,
  Link,
  Text,
} from "@/utils/@chakraui/wrapper";
import { getServerSession } from "next-auth";
import NextLink from "next/link";
import { LogoutButton } from "./LogoutButton";

export async function UserAvatar() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const { name, email, image }: any = session?.user;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar name={name} src={image} title={name} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            <Text
              padding={2}
              borderRadius={4}
              fontSize={16}
              _hover={{ background: "brand.400", color: "white" }}
            >
              {name || email}
            </Text>
            <Link
              as={NextLink}
              href="/settings/user"
              padding={2}
              borderRadius={4}
              _hover={{ background: "brand.400", color: "white" }}
            >
              Edit Profile
            </Link>
            <LogoutButton />
          </Stack>
        </PopoverBody>
        <PopoverCloseButton />
      </PopoverContent>
    </Popover>
  );
}
