"use client";

import {
  VStack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormControl,
  Container,
} from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MAX_PAGE_WIDTH } from "./_utils/constants";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const onSearch = useCallback(() => {
    const walletId = inputRef.current?.value;
    if (walletId) router.push(`/user/${walletId}`);
  }, [router]);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) inputElement.value = "Ronald-McDonald";
  }, []);

  return (
    <VStack maxW={MAX_PAGE_WIDTH} w="100%">
      <Image src="/hero.png" alt="hero" width={250} height={250} />
      <Container maxW={600} w="100%" position="relative" mt={15}>
        <FormControl>
          <InputGroup size="md">
            <Input
              id="userId"
              pr="4.9rem"
              placeholder="Wallet ID"
              borderRadius={99}
              size="lg"
              ref={inputRef}
              bg="gray.600"
              data-peer
            />
            <InputRightElement width="5.1rem">
              <Button
                top="0.25rem"
                h="2.5rem"
                size="sm"
                borderRadius={99}
                bg="blue.500"
                _hover={{ bg: "blue.400" }}
                onClick={onSearch}
              >
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Container>
    </VStack>
  );
}
