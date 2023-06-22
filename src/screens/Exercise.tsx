import {
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Image,
  Box,
  ScrollView,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";
import { Button } from "@components/Button";

import { api } from "@services/api";
import { useEffect, useState } from "react";

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";

type RouteParams = {
  exerciseId: string;
};

export function Exercise() {
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const [sendRegister, setSendRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { exerciseId } = route.params as RouteParams;
  const toast = useToast();

  function handleGoHome() {
    navigation.goBack();
  }

  async function fetchExerciseById() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/exercises/${exerciseId}`);

      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Falha ao buscar detalhes do exercício. Tente novamente mais tarde!";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendRegister(true);

      await api.post("/history", { exercise_id: exerciseId });

      toast.show({
        title: "Parabéns! Exercício registrado com sucesso",
        placement: "top",
        bgColor: "green.700",
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Falha ao registrar o exercício. Tente novamente mais tarde!";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setSendRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseById();
  }, [exerciseId]);

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
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                alt="Imagem do exercício"
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                resizeMode="cover"
                rounded="lg"
              />
            </Box>
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
                    {exercise.series} séries
                  </Text>
                </HStack>
                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                onPress={handleExerciseHistoryRegister}
                isLoading={sendRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
