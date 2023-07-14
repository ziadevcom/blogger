"use client";

import {
  Button,
  Checkbox,
  Input,
  Select,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Button onClick={toggleColorMode} variant="solid">
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
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
    </div>
  );
}
