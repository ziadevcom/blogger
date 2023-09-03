"use client";
import {
  FormControl,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
} from "@/utils/@chakraui/wrapper";
import { Input } from "@/components/Input";
import { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchPosts({
  label,
  placeholder,
}: {
  label?: true;
  placeholder?: string;
}) {
  const router = useRouter();
  const inputRef: { current: HTMLInputElement | undefined } = useRef();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const searchTerm = inputRef?.current?.value;

    if (!searchTerm) return;

    router.push(`/search?q=${searchTerm}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel
          fontWeight="semibold"
          htmlFor="searchPost"
          className={label ? "" : "sr-only"}
        >
          Search
        </FormLabel>
        <InputGroup>
          <Input
            id="searchPost"
            placeholder={placeholder ?? "Type & Press Enter"}
            ref={inputRef}
            fontSize="sm"
          ></Input>
          <InputRightElement>
            <Icon as={Search} color="gray.400" />
          </InputRightElement>
        </InputGroup>{" "}
      </FormControl>
    </form>
  );
}
