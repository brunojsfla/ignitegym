import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";

import { api } from "@services/api";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { AppError } from "@utils/AppError";
import { useFocusEffect } from "@react-navigation/native";
import { Loading } from "@components/Loading";

export function History() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/history`);

      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Falha ao buscar o histórico. Tente novamente mais tarde!";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" alignItems="center">
              Não há exercícios registrados ainda!
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
