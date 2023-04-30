import { HStack, Heading, Text, VStack, Icon } from "native-base";

import { Entypo } from "@expo/vector-icons";

export function HistoryCard() {
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
          Pernas
        </Heading>
        <Text color="gray.100" fontSize="lg" mt={1} numberOfLines={1}>
          Agachamento
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="md">
        19:00
      </Text>
    </HStack>
  );
}
