import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: "https://www.dicasdetreino.com.br/wp-content/uploads/2018/09/Agachamento-%E2%80%93-Execu%C3%A7%C3%A3o-Varia%C3%A7%C3%B5es-Erros-e-Dicas.jpg",
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading color="white" fontSize="lg">
            Agachamento
          </Heading>
          <Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
            3 séries x 8 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}
