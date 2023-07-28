"use client";

import { Input } from "@/components/Input";
import {
  Checkbox,
  Select,
  Stack,
  Text,
  Heading,
  Button,
  Code,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data, update } = useSession();
  return (
    <div>
      <Input placeholder="Basic usage" />
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <Stack spacing={5} direction="row">
        <Checkbox isDisabled>Checkbox</Checkbox>
        <Checkbox isDisabled defaultChecked>
          Checkbox
        </Checkbox>
        <Checkbox>Do you agree?</Checkbox>
      </Stack>
      <Heading>I am a Heading</Heading>{" "}
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
        doloremque explicabo, cum quod, magni inventore rem accusantium
        voluptatem facere tempora atque repudiandae officiis eveniet similique
        veniam adipisci placeat impedit cupiditate.
      </Text>
      <Button onClick={() => update()}>Update Session</Button>
      <Button
        onClick={() => {
          axios
            .post("/api/post", {
              title: "API routes in NextJS 13 - App router",
              content:
                "Hola, today I will teach you about api routes in next js 13...",
              slug: "api-routes-nextjs-13-app-router",
              featured_image:
                "https://nextjs.org/api/og?title=API%20Routes%20-%20App%20Router",
              status: "draft",
            })
            .then((d) => console.log(d.data))
            .catch((e) => console.log(e));
        }}
      >
        Create demo post
      </Button>
      <Code>{JSON.stringify(data)}</Code>
    </div>
  );
}
