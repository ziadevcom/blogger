"use client";

import {
  Checkbox,
  Input,
  Select,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Input placeholder="Basic usage" focusBorderColor="brand.400" />
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
    </div>
  );
}
