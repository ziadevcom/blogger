import { InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { Input } from "@/components/Input";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";

export const PasswordInput = forwardRef(function PasswordInput(
  props: any,
  ref: any
) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        {...props}
        ref={ref}
      />

      <InputRightElement width="4.5rem" height="100%">
        <Button h="1.75rem" size="sm" onClick={handleClick} variant="link">
          {show ? <EyeOff /> : <Eye />}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
