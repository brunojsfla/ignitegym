import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormProps = {
  name: string;
  email: string;
  password: string;
};

const signUpSchema = yup
  .object({
    name: yup.string().required("O campo nome é obrigatório!"),
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

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignIn() {
    navigation.goBack();
  }

  function handleSingUp(data: FormProps) {
    console.log(data);
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
            Crie sua conta
          </Heading>

          <Controller
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
            control={control}
          />

          <Controller
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
            control={control}
          />

          <Controller
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                type="password"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
            control={control}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSingUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
          onPress={handleNavigateToSignIn}
        />
      </VStack>
    </ScrollView>
  );
}
