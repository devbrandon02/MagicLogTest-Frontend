import { Box, Button, Field, Heading, Input, Spinner } from "@chakra-ui/react";
import { PasswordInput } from "../ui/password-input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster, toaster } from "../ui/toaster";
import { AppRoutesPath } from "../../routes/app.routes";
import { createUserThunk, clearMessages } from "../../store/user/user.slice";
import type { RootState } from "../../store/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = yup.object({
  name: yup.string().required("El nombre es requerido."),
  email: yup.string().email("El email es inválido.").required("El email es requerido."),
  password: yup.string().min(6, "La contraseña debe tener mínimo 6 caracteres.").required("La contraseña es requerida."),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir.")
    .required("La confirmación de la contraseña es requerida."),
});

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    await dispatch<any>(createUserThunk({
      name: data.name,
      email: data.email,
      password: data.password,
      role: "SELLER"
    }));
  };

  useEffect(() => {
    if (successMessage) {
      toaster.create({
        title: "Usuario creado",
        description: "Usuario creado correctamente.",
        type: "success"
      });
      reset();
      dispatch(clearMessages());
    }

    if (error) {
      toaster.create({
        title: "Error al crear usuario",
        description: error,
        type: "error"
      });
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch, reset]);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box padding={5} w="100%" display="flex" justifyContent="center" roundedTop="lg">
        <Heading as="h2" color="black" fontSize="2xl">
          Crea tu cuenta
        </Heading>
      </Box>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Field.Root required>
          <Field.Label>Nombre <Field.RequiredIndicator /></Field.Label>
          <Input {...register("name")} placeholder="Brando Rodriguez" />
          <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.name?.message}</span>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
          <Input {...register("email")} placeholder="me@magiclog" />
          <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.email?.message}</span>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Contraseña <Field.RequiredIndicator /></Field.Label>
          <PasswordInput {...register("password")} placeholder="***********" />
          <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.password?.message}</span>
        </Field.Root>

        <Field.Root required>
          <Field.Label>Confirmar contraseña <Field.RequiredIndicator /></Field.Label>
          <PasswordInput {...register("confirmPassword")} placeholder="***********" />
          <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.confirmPassword?.message}</span>
        </Field.Root>

        <Button type="submit" bgColor="blue.600" loading={loading} color="white" _hover={{ bgColor: "blue.700" }} _active={{ bgColor: "blue.800" }}>
          {loading ? <Spinner size="sm" /> : "Crear cuenta"}
        </Button>

        <Heading
          as="h3"
          fontSize="sm"
          color="gray.500"
          _hover={{ color: "blue.500" }}
          cursor="pointer"
          onClick={() => navigate(AppRoutesPath.authLoginPath)}
          textAlign="center"
        >
          ¿Ya tienes cuenta?
        </Heading>
      </form>
    </Box>
  );
};

export default FormRegister;
