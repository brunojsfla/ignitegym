import { HStack, Heading, Text, VStack, Icon } from "native-base";

import { Entypo } from "@expo/vector-icons";
import { HistoryDTO } from "@dtos/HistoryDTO";

type Params = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: Params) {
  return (
    <HStack
      bg="gray.600"
      alignItems="center"
      px={3}
      py={4}
      rounded="md"
      mb={3}
      justifyContent="space-between"
    >
      <VStack mr={5} flex={1}>
        <Heading color="white" fontSize="md" textTransform="capitalize">
          {data.group}
        </Heading>
        <Text color="gray.100" fontSize="lg" mt={1} numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  );
}
