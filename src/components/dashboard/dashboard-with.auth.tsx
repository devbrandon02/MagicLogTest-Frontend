import { Box, Button, CloseButton, Dialog, Field, Input, NumberInput, Portal, Table } from "@chakra-ui/react"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { createProductThunk, fetchProductsByUserIdThunk, resetProductState } from "../../store/product/product.slice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/index";
import { Toaster, toaster } from "../ui/toaster";
import { useEffect } from "react";

type CreateProductFormData = {
  name: string
  sku: string
  price: number
  quantity: number
};

const schema = yup.object({
  name: yup.string().required("El nombre es requerido."),
  sku: yup.string().required("El SKU es requerido."),
  price: yup.number().required("El precio es requerido.").positive("El precio debe ser un número positivo."),
  quantity: yup.number().required("La cantidad es requerida.").min(0, "La cantidad no puede ser negativa."),
});


const DashboardWithAuth = () => {
  const dispatch = useDispatch();
  const { error, successMessage, products } = useSelector((state: RootState) => state.product);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      sku: '',
      price: 0,
      quantity: 0,
    },
  });

  const onSubmit = async (data: CreateProductFormData) => {
    await dispatch<any>(createProductThunk({
      name: data.name,
      quantity: data.quantity,
      price: data.price,
      sku: data.sku,
    }));

    reset();
  };

  useEffect(() => {
    if (successMessage) {
      toaster.create({
        title: "Producto creado",
        description: "Producto creado correctamente.",
        type: "success"
      });
      reset();
      dispatch(resetProductState());

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    if (error) {
      console.log("error", error);

      toaster.create({
        title: "Error al crear usuario",
        description: error,
        type: "error"
      });
      dispatch(resetProductState());
    }
  }, [successMessage, error, dispatch, reset]);

  const fetchProductsByUserId = async () => {
    await dispatch<any>(fetchProductsByUserIdThunk());
  }

  useEffect(() => {
    fetchProductsByUserId()
  }, []);


  return (
    <Box display={"flex"} justifyContent="start" alignItems="end" gap={5} flexDirection={"column"} height="100%" padding={10}>
      <Box>
        <Toaster />

        <Dialog.Root
          placement={"center"}
          motionPreset="slide-in-bottom"
          closeOnInteractOutside={false}
        >
          <Dialog.Trigger asChild>
            <Button>Crear Producto</Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Crea un Producto</Dialog.Title>
                </Dialog.Header>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Dialog.Body display={"flex"} flexDirection="column" gap={5}>
                    <Field.Root required>
                      <Field.Label>
                        Nombre de Producto <Field.RequiredIndicator />
                      </Field.Label>
                      <Input {...register("name")} placeholder="Nevera" />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.name?.message}</span>
                    </Field.Root>

                    <Field.Root required>
                      <Field.Label>
                        SKU <Field.RequiredIndicator />
                      </Field.Label>
                      <Input {...register("sku")} placeholder="SKU1256" />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.sku?.message}</span>
                    </Field.Root>

                    <NumberInput.Root>
                      <NumberInput.Label>
                        Precio <span style={{ color: "red", fontSize: "0.8rem" }}>*</span>
                      </NumberInput.Label>
                      <NumberInput.Scrubber />
                      <NumberInput.Input {...register("price")} placeholder="$1000" />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.price?.message}</span>
                    </NumberInput.Root>

                    <NumberInput.Root>
                      <NumberInput.Label>
                        Cantidad <span style={{ color: "red", fontSize: "0.8rem" }}>*</span>
                      </NumberInput.Label>
                      <NumberInput.Scrubber />
                      <NumberInput.Input {...register("quantity")} placeholder="$1000" />
                      <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.quantity?.message}</span>
                    </NumberInput.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button type="submit">Crear Producto</Button>
                  </Dialog.Footer>
                </form>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Box>
      <Table.ScrollArea borderWidth="1px" w="100%" rounded="md" height="560px">
        <Table.Root size="lg" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Producto</Table.ColumnHeader>
              <Table.ColumnHeader>SKU</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {products?.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.sku}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell textAlign="end">{item.quantity}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  )
}

export default DashboardWithAuth