import { VStack, FlatList, HStack, Heading, Text, useToast } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useCallback, useEffect, useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const toast = useToast();

  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState<string>("");
  const [exercise, setExercise] = useState<ExerciseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(id: string) {
    navigation.navigate("exercise", { exerciseId: id });
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups");

      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Falha ao buscar os grupos musculares. Tente novamente mais tarde!";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercise(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Falha ao buscar os exercícios. Tente novamente mais tarde!";

      toast.show({ title, placement: "bottom", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxHeight={10}
        minHeight={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercise.length}
          </Text>
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={exercise}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                id={item.id}
                thumb={item.thumb}
                name={item.name}
                series={item.series}
                repetitions={item.repetitions}
                group={item.group}
                demo={item.demo}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </VStack>
    </VStack>
  );
}
