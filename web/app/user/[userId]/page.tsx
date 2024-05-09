import { MAX_PAGE_WIDTH } from "@/app/_utils/constants";
import {
  Box,
  Card,
  Container,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Fragment } from "react";

type ResponseType = {
  data: {
    averageGasUsed: string;
    transactionCount: number;
    transactions: {
      from: string;
      functionName: string;
      gas: string;
      gasPrice: string;
      gasUsed: string;
      to: string;
      value: string;
    }[];
    uniqueAddressesInteractedWith: number;
  };
};

export default async function User({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const response = await fetch(
    `http://127.0.0.1:5000/getTransactions/${userId}`
  );
  const { data } = (await response.json()) as ResponseType;

  const interactions = data.transactions.reduce<Record<string, number>>(
    (acc, curr) => {
      const type = curr.functionName.split("(")[0];
      const peer = type === "buy" ? curr.from : curr.to;
      const item = acc[peer];
      if (!item)
        return {
          ...acc,
          [peer]: 1,
        };
      return {
        ...acc,
        [peer]: item + 1,
      };
    },
    {}
  );

  console.log({ data });
  console.log({ interactions });

  return (
    <VStack w="100%">
      <VStack w="100%" backgroundColor="whiteAlpha.200" py={5}>
        <VStack maxW={MAX_PAGE_WIDTH} w="100%" align="flex-start" gap={0}>
          <Text fontWeight="bold">{params.userId}</Text>
          <Text fontSize="xs">{`${data.transactionCount} total transactions`}</Text>
          <Text fontSize="xs">{`${data.uniqueAddressesInteractedWith} users interacted with`}</Text>
          <Text fontSize="xs">{`Average gas used: ${data.averageGasUsed.replace(
            /[^0-9.]/g,
            ""
          )}`}</Text>
        </VStack>
      </VStack>
      <HStack w="100%" maxW={MAX_PAGE_WIDTH} align="flex-start">
        <VStack flex="0 0 300px" gap={2}>
          <Card
            bg="whiteAlpha.200"
            w="100%"
            borderRadius={2}
            fontSize="xs"
            p={2}
          >
            <VStack align="flex-start">
              <Box fontWeight="semibold">Recently Transacted With</Box>
              <VStack>
                <HStack justifyContent="space-between" w="100%">
                  <Text>Address</Text>
                  <Text textAlign="right">Count</Text>
                </HStack>
                {Object.entries(interactions).map(([peer, count]) => {
                  return (
                    <HStack key={peer} w="100%" justifyContent="space-between">
                      <Text textOverflow="ellipsis" flex="4 4">
                        {peer}
                      </Text>
                      <Text textAlign="right" fontWeight="bold" flex="1 1">
                        {count}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </VStack>
          </Card>
        </VStack>
        <VStack flex={1} gap={2}>
          {data.transactions.map((transaction) => {
            const type = transaction.functionName.split("(")[0];
            console.log({ transaction });
            return (
              // eslint-disable-next-line react/jsx-key
              <Card
                bg={
                  type === "sell"
                    ? "green.800"
                    : type === "buy"
                    ? "red.800"
                    : "blue.800"
                }
                w="100%"
                borderRadius={2}
                borderLeft="8px solid"
                borderColor={
                  type === "buy"
                    ? "red.600"
                    : type === "sell"
                    ? "green.600"
                    : "blue.600"
                }
                p={2}
              >
                <HStack fontSize="xs" align="flex-start">
                  <Text
                    fontWeight="bold"
                    textTransform="capitalize"
                    color={type === "buy" ? "red.300" : "green.100"}
                  >
                    {type}
                  </Text>
                  <Box>{transaction.gas}</Box>
                  <HStack flex={1} justify="space-between" align="flex-start">
                    <VStack gap={0}>
                      <Text>Seller: {transaction.from}</Text>
                      <Text>Buyer: {transaction.to}</Text>
                    </VStack>
                    <VStack align="flex-start" gap={0}>
                      <Text>Gas: {transaction.gas}</Text>
                      <Text>Gas price: {transaction.gasPrice}</Text>
                      <Text>Gas used: {transaction.gasUsed}</Text>
                    </VStack>
                  </HStack>
                </HStack>
              </Card>
            );
          })}
        </VStack>
      </HStack>
    </VStack>
  );
}
