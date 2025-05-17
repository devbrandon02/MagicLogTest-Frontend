import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  Text,
  CloseButton,
  Stack,
  Avatar,
  Button,
  AvatarGroup,
} from "@chakra-ui/react";
import { Drawer } from "@chakra-ui/react";
import { GiExitDoor, GiHamburgerMenu } from "react-icons/gi";
import { FiBarChart2, FiHelpCircle, FiHome, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/user/user.slice";
import type { AppDispatch, RootState } from "../store";
import type { User } from "../types/user.types";
import { logout } from '../store/user/user.slice';
import { useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { AppRoutesPath } from "../routes/app.routes";

const SidebarContent = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  return (
    <Box
      bg="#434190"
      color="white"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      p={5}
    >
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="xl" fontWeight="bold">
          Mi App
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Stack align="flex-start" fontSize="md" fontWeight="semibold">
        <Flex
          onClick={() => {
            navigate('/')
          }}
          align="center"
          cursor="pointer"
          px={2}
          py={2}
          borderRadius="md"
          _hover={{ bg: "indigo.600" }}
        >
          <FiShoppingBag size={20} />
          <Text ml={3}>Marketplace</Text>
        </Flex>
        <Flex
          align="center"
          cursor="pointer"
          px={2}
          py={2}
          borderRadius="md"
          _hover={{ bg: "indigo.600" }}
        >
          <FiHome size={20} />
          <Text ml={3}>Inventarios</Text>
        </Flex>

        <Flex
          align="center"
          px={2}
          py={2}
          borderRadius="md"
          color="gray.400"
          cursor="not-allowed"
          userSelect="none"
        >
          <FiBarChart2 size={20} />
          <Text ml={3}>Dashboard</Text>
        </Flex>

        <Flex
          align="center"
          px={2}
          py={2}
          borderRadius="md"
          color="gray.400"
          cursor="not-allowed"
          userSelect="none"
        >
          <FiHelpCircle size={20} />
          <Text ml={3}>Soporte</Text>
        </Flex>
      </Stack>
    </Box>
  )
};

const Header = ({
  onOpen,
  isDesktop,
}: {
  onOpen: () => void;
  isDesktop: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.me) as User | null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  }

  const redirectToHome = () => {
    navigate(AppRoutesPath.authLoginPath);
  }

  return (
    <Flex
      as="header"
      top={0}
      left={0}
      right={0}
      height="60px"
      bg="#4C51BF"
      color="white"
      align="center"
      px={4}
      justify={{ base: "space-between", md: "flex-end" }}
      boxShadow="sm"
      zIndex={1000}
    >
      {!isDesktop && (
        <IconButton onClick={onOpen} aria-label="Search database">
          <GiHamburgerMenu />
        </IconButton>
      )}

      <Text display={{ base: "none", md: "block" }} fontWeight="bold" mr="auto">
        MagicLog Test
      </Text>

      <Flex align={"center"} gap={3}>
        {user?.name ? (
          <>
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
            <Text fontSize="sm" mr={2}>
              {user.name}
            </Text>
            <CloseButton display={{ base: "none", md: "flex" }} onClick={handleLogout} />
          </>
        ) : (
          <Button onClick={redirectToHome} size="sm" bgColor={"white"} variant="outline">
            <GiExitDoor />
            <Text color={"black"}>Iniciar sesión</Text>
          </Button>
        )}
      </Flex>
    </Flex>

  )
};

const LayoutDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true }) ?? false;
  const onOpen = () => setIsOpen(true);

  const dispatch: AppDispatch = useDispatch();
  const { me, loading, error } = useSelector((state: RootState) => state.user);


  const getUserMe = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("obteniendo usuario");

      await dispatch(getUserThunk());
    }
  }

  useEffect(() => {
    if (!me) {
      getUserMe();
    }

    return () => {

    }
  }, [dispatch]);

  useEffect(() => {
    console.log("User actualizado:", me);
  }, [me]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box minH="100vh" bg="gray.50">
      <Header onOpen={onOpen} isDesktop={isDesktop} />
      {isDesktop && <SidebarContent onClose={() => { }} />}

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Drawer.Backdrop
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
        <Drawer.Positioner
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "flex-start",
            zIndex: 1000,
          }}
        >
          <Drawer.Content bg={"#434190"} color={"white"}>
            <Drawer.CloseTrigger asChild>
              <CloseButton
                mb={6}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
              />
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Mi App
              </Text>
            </Drawer.Header>
            <Drawer.Body style={{ flex: 1 }}>
              <Stack align="flex-start">
                <Box>Inventario</Box>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer>
              <Text fontSize="sm" mt="auto">
                © 2025 MagicLog Test
              </Text>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
      <Box
        ml={{ base: 0, md: 60 }}
        pt="60px"
        p={4}
        w={{ base: "full", md: "calc(100% - 20%)" }}
        height={"calc(100vh - 60px)"}
        transition="margin-left 0.2s ease"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutDashboard;