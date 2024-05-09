import { useColorMode } from "@chakra-ui/react";
import { useMemo } from "react";

export const useIsDarkMode = () => {
  const { colorMode } = useColorMode();
  return useMemo(() => colorMode === "dark", [colorMode]);
};
