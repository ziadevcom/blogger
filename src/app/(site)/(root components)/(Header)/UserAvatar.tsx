"use client";

import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Avatar,
  SkeletonCircle,
  Stack,
  Link,
  Text,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";

export function UserAvatar() {
  const session = useSession();

  if (session.status === "unauthenticated") return null;

  if (session.status === "loading") {
    return <SkeletonCircle size="10" />;
  }

  const { name, email, image } = session?.data?.user;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar name="Dan Abrahmov" src={image} title={name} />
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
              {name}: {email}
            </Text>
            <Link
              as={NextLink}
              href="/profile"
              padding={2}
              borderRadius={4}
              _hover={{ background: "brand.400", color: "white" }}
            >
              Edit Profile
            </Link>
            <Button
              onClick={signOut}
              textAlign="left"
              variant="link"
              color="red.500"
              paddingY={3}
              backgroundColor="red.100"
              _hover={{ backgroundColor: "red.200" }}
            >
              Logout
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
