import { Box, Button, Field, Heading, Input, Spinner } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AppRoutesPath } from "../../routes/app.routes";
import { loginThunk } from "../../store/user/user.slice";
import { Toaster, toaster } from "../ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/index";
import { unwrapResult } from "@reduxjs/toolkit";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("El email es inválido.").required("El email es requerido."),
  password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres.").required("La contraseña es requerida."),
});

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const resultAction = await dispatch(loginThunk(data));
      const res = unwrapResult(resultAction);

      reset()

      toaster.create({
        title: "Inicio de sesión exitoso",
        description: `¡Bienvenido, ${res.name}!, Redireccionando...`,
        type: "success",
      });


      setTimeout(() => {
        navigate(AppRoutesPath.dashboardAdminPath);
      }, 2000);


    } catch (err: any) {
      toaster.create({
        title: "Error al iniciar sesión",
        description: "Credenciales incorrectas o usuario no encontrado.",
        type: "error",
      });
    }
  };

  const dontHaveAccount = () => {
    navigate(AppRoutesPath.authRegisterPath);
  };

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box padding={5} w="100%" display="flex" justifyContent="center" roundedTop="lg">
        <Heading as="h2" color="black" fontSize="2xl">
          Inicio de Sesión
        </Heading>
      </Box>

      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Field.Root required>
          <Field.Label>
            Email <Field.RequiredIndicator />
          </Field.Label>
          <Input {...register("email")} placeholder="me@magiclog" />
          <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.email?.message}</span>
        </Field.Root>

        <Field.Root required>
          <Field.Label>
            Contraseña <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput {...register("password")} placeholder="***********" />
          <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.password?.message}</span>
        </Field.Root>

        <Button type="submit" bgColor="blue.600" loading={loading} color="white" _hover={{ bgColor: "blue.700" }} _active={{ bgColor: "blue.800" }}>
          {loading ? <Spinner size="sm" /> : "Iniciar sesión"}
        </Button>
      </form>

      <Heading
        as="h3"
        fontSize="sm"
        color="gray.500"
        _hover={{ color: "blue.500" }}
        onClick={dontHaveAccount}
        cursor="pointer"
        textAlign="center"
      >
        ¿No tienes cuenta?
      </Heading>
    </Box>
  );
};

export default FormLogin;
