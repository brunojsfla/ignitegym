import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  Box,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoHome() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoHome}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading color="gray.100" fontSize="lg" flexShrink={1}>
            Agachamento
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Pernas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            alt="Imagem do exercício"
            source={{
              uri: "https://www.dicasdetreino.com.br/wp-content/uploads/2018/09/Agachamento-%E2%80%93-Execu%C3%A7%C3%A3o-Varia%C3%A7%C3%B5es-Erros-e-Dicas.jpg",
            }}
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack
              justifyContent="space-around"
              alignItems="center"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color="gray.200" ml={2}>
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.200" ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
