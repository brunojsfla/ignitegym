import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useForm, Controller } from "react-hook-form";

import { useAuth } from "@hooks/useAuth";
import { UserDTO } from "@dtos/UserDTO";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = yup
  .object({
    email: yup
      .string()
      .email("E-mail inválido")
      .required("O campo e-mail é obrigatório!"),
    password: yup
      .string()
      .required("O campo senha é obrigatório!")
      .min(6, "A senha deve possuir um mínino de 6 caracteres"),
  })
  .required();

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(signInSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();

  function handleNavigateToSignUp() {
    navigation.navigate("signup");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível realizar o login! Tente novamente mais tarde!";

      setIsLoading(false);
      toast.show({ title, placement: "top", bgColor: "red.500" });
    }
  }

  return (
    <ScrollView
      _contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          alt="Pessoas treinando em uma academia"
          resizeMode="contain"
          position="absolute"
          defaultSource={BackgroundImg}
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                type="password"
                autoCapitalize="none"
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNavigateToSignUp}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
