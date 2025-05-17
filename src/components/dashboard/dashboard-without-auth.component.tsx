import { Box, Button, CloseButton, Dialog, Heading, Image, Portal, Text } from "@chakra-ui/react"
import { AppRoutesPath } from "../../routes/app.routes"
import { useNavigate } from "react-router-dom";

const DashboardWithoutAuth = () => {
  const navigate = useNavigate();

  return (
    <Box w={"100%"} h={"100%"}>
      <Box display={"flex"} justifyContent="center" alignItems="center" height="100%" flexDirection={"column"} gap={10}>
        <Box w={{ base: "90%", lg: "70%" }} padding={10} bgColor={"gray.200"} h={{ base: "80%", lg: "50%" }} gap={{ base: 10, lg: 5 }} flexDirection={{ base: "column", lg: "row" }} display={"flex"} justifyContent="center" alignItems="center" borderRadius={"lg"}>
          <Box w="100%" maxW="600px" mx="auto">
            <Image
              src="https://imgs.search.brave.com/cwBrnxdeuHYoSPETwiabL3AeKNwFMCib6PBIQ32PTEI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LW1hbmFnZW1l/bnQtZmlsZXMuY2Fu/dmEuY29tL2Nkbi1j/Z2kvaW1hZ2UvZj1h/dXRvLHE9NzAvNzhi/MzViMzktZjU1Ni00/YmYwLTlhYWItZmZl/MTE5YzViZjg2L21v/Y2t1cHNfaW50ZXJu/YWwtbGluazJ4LnBu/Zw"
              alt=""
              width="400px"
              height="400px"
              objectFit="fill"
            />
          </Box>
          <Box w={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"} gap={5}>
            <Box>
              <Heading as="h2" color="black" fontSize="3xl" fontWeight={"bold"}>
                Crea tu producto
              </Heading>
            </Box>
            <Box display={"flex"} gap={"5"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
              <Box>Conocer Mas</Box>
              <Box>
                <Dialog.Root
                  placement={"center"}
                  motionPreset="slide-in-bottom"
                >
                  <Dialog.Trigger asChild>
                    <Button>Crear Productos</Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Crea una cuenta</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <Text>
                            Registrate o inicia sesión para acceder a tu cuenta de administrador y gestionar tus productos de manera eficiente.
                          </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button onClick={() => navigate(AppRoutesPath.authLoginPath)} variant="outline">Iniciar Sesion</Button>
                          </Dialog.ActionTrigger>
                          <Button onClick={() => navigate(AppRoutesPath.authRegisterPath)}>Crear una Cuenta</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box cursor={"pointer"} onClick={() => navigate(AppRoutesPath.authLoginPath)}>
          <Text color={"blue.400"}>
            Inicia sesión para acceder a tu cuenta de administrador y gestionar tus productos de manera eficiente.
          </Text>
        </Box>
      </Box>
      <Dialog.Root
        placement={"center"}
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}

export default DashboardWithoutAuth