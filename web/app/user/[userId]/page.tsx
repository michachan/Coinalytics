import { MAX_PAGE_WIDTH } from "@/app/_utils/constants";
import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";

export default function User({ params }: { params: { userId: string } }) {
  return (
    <VStack w="100%">
      <VStack w="100%" backgroundColor="whiteAlpha.200" py={5}>
        <VStack maxW={MAX_PAGE_WIDTH} w="100%" align="flex-start" gap={0}>
          <Text fontWeight="bold">{params.userId}</Text>
          <Text fontSize="xs">1,920 total transactions</Text>
        </VStack>
      </VStack>
      <HStack w="100%" maxW={MAX_PAGE_WIDTH} align="flex-start">
        <VStack flex="0 0 325px" gap={2}>
          <Card bg="red" w="100%" borderRadius={2}>
            left
          </Card>
          <Card bg="red" w="100%" borderRadius={2}>
            left
          </Card>
          <Card bg="red" w="100%" borderRadius={2}>
            left
          </Card>
        </VStack>
        <VStack flex={1} gap={1}>
          <Card bg="green" w="100%" borderRadius={2}>
            right
          </Card>
        </VStack>
      </HStack>
    </VStack>
  );
}
