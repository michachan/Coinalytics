"use client";

import {
  Box,
  Button,
  HStack,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

import { useIsDarkMode } from "../_hooks/useIsDarkMode";
import { Link } from "@chakra-ui/next-js";
import { MAX_PAGE_WIDTH } from "../_utils/constants";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Get free Bitcoin",
    url: "/btc",
  },
];

export default function Header() {
  const { toggleColorMode } = useColorMode();
  const isDarkMode = useIsDarkMode();
  const pathName = usePathname();

  return (
    <Box display="block">
      <HStack justify="space-between" px={5}>
        <Text as="h2" fontWeight="900" textTransform="uppercase" fontSize={16}>
          Coinalytics
        </Text>
        <Button onClick={toggleColorMode} background="transparent">
          {isDarkMode ? "🌝" : "🌞"}
        </Button>
      </HStack>
      <HStack
        px={5}
        bg="blue.600"
        color="white"
        fontSize="sm"
        justifyContent="center"
        alignItems="center"
      >
        <HStack py={3} maxW={MAX_PAGE_WIDTH} w="100%" gap={7}>
          {MENU_ITEMS.map((item, i) => {
            const isActive = pathName === item.url;
            return (
              <Link
                href={item.url}
                key={i}
                color={isActive ? "white" : "gray.400"}
              >
                {item.title}
              </Link>
            );
          })}
        </HStack>
      </HStack>
    </Box>
  );
}
