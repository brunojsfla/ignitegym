import { VStack, FlatList, HStack, Heading, Text } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Home() {
  const [groups, setGroups] = useState([
    "costas",
    "bíceps",
    "tríceps",
    "ombro",
    "perna",
    "peito",
    "abdominal",
  ]);
  const [groupSelected, setGroupSelected] = useState("perna");
  const [exercise, setExercise] = useState(["Agachamento", "Extensora"]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(){
    navigation.navigate('exercise');
  }

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
        <FlatList
          data={exercise}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard onPress={handleOpenExerciseDetails}/>}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
