"use client";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import {
  Checkbox,
  Select,
  Stack,
  Text,
  Heading,
  Code,
} from "@/utils/@chakraui/wrapper";
import { useSession } from "next-auth/react";
import axios from "axios";

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
              title:
                "API routes in NextJS 13 - App router " +
                Math.round(
                  Math.random() * Math.random() * (Math.random() * 100)
                ),
              content: JSON.stringify([
                { insert: "Your post content goes here..." },
              ]),
              slug: "api-routes-nextjs-13-app-router",
              featured_image:
                "https://nextjs.org/api/og?title=API%20Routes%20-%20App%20Router",
              status: "public",
            })
            .then((d) => console.log(d.data))
            .catch((e) => console.log(e));
        }}
      >
        Create demo post
      </Button>
      {/* <Code>{JSON.stringify(data)}</Code> */}
    </div>
  );
}
