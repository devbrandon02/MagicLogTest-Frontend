import {
  Avatar, AvatarGroup, CloseButton, Flex,
  Box, Button, Text,
  Input,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/index";
import { getUsersByRoleThunk, logout } from "../../store/user/user.slice";
import { DashboardRoutesPath } from "../../routes/app.routes";
import type { User } from "../../types/user.types";
import { fetchProductsThunk } from "../../store/product/product.slice";
import { useEffect, useState } from "react";
import GridProducts from "./grid-products";

const HeaderMarketplace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { me } = useSelector((state: RootState) => state.user) as { me: User | null };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    navigate("/");
  }

  const redirectToAdminPage = () => {
    navigate(DashboardRoutesPath.inventoryAdminPath);
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
      <Text display={{ base: "none", md: "block" }} fontWeight="bold" mr="auto">
        MagicLog Test
      </Text>

      <Flex align={"center"} gap={3}>
        {me?.name ? (
          <>
            <AvatarGroup>
              <Avatar.Root>
                <Avatar.Fallback />
                <Avatar.Image />
              </Avatar.Root>
            </AvatarGroup>
            <Text fontSize="sm" mr={2}>
              {me.name}
            </Text>
          </>
        ) : (
          <Button onClick={redirectToAdminPage} size="sm" bgColor={"white"} variant="outline">
            <Text color={"black"}>Zona Vendedor</Text>
          </Button>
        )}

        {me?.name && (<Button onClick={redirectToAdminPage} size="sm" bgColor={"white"} variant="outline">
          <Text color={"black"}>Administrar</Text>
        </Button>)}

        <CloseButton display={{ base: "none", md: "flex" }} onClick={handleLogout} />
      </Flex>
    </Flex>
  )
};

export const MarketPlaceBuyerComponent = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const { me } = useSelector((state: RootState) => state.user) as { me: User | null };
  const usersByRoles = useSelector((state: RootState) => state.user.usersByRol) as User[] | null;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [selectedSeller, setSelectedSeller] = useState({
    id: "",
    name: ""
  })

  const fetchProductsAll = async () => {
    await dispatch<any>(fetchProductsThunk({
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      search: search || undefined,
      sellerId: selectedSeller.id || undefined
    }));
  }

  const fetchUsersByRole = async () => {
    await dispatch<any>(getUsersByRoleThunk());
  }

  useEffect(() => {
    fetchProductsAll()
  }, [minPrice, maxPrice, search, selectedSeller.id]);

  useEffect(() => {
    fetchUsersByRole()
  }, [])

  return (
    <Box display="flex" flexDirection="column" w="100%" h="100%">
      <HeaderMarketplace />

      <Box padding={5} w="100%" display="flex" justifyContent="center" roundedTop="lg">
        <Text as="h2" color="black" fontSize="2xl">
          Bienvenido al Marketplace
        </Text>
      </Box>

      <Box display="flex" flexDirection={{ base: "column", lg: "row" }} gap={5} w="100%" padding={10}>
        <Box width={{ base: "100%", lg: "10%" }} display="flex" flexDirection="column" gap={5}>
          <Text fontWeight="bold">Filtros</Text>
          {me?.role !== "SELLER" ? (
            <Box>
              <Box>
                <Text fontSize="sm" mb={1}>Precio mínimo</Text>
                <Input
                  placeholder="Ej: 1000"
                  type="number"
                  size="sm"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </Box>

              <Box>
                <Text fontSize="sm" mb={1}>Precio máximo</Text>
                <Input
                  placeholder="Ej: 5000"
                  type="number"
                  size="sm"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </Box>
            </Box>) : (
            <Box>
              <select
                value={selectedSeller?.id || ''}
                onChange={(e) => {
                  const seller: any = usersByRoles?.find((u: any) => u.id === e.target.value);
                  if (seller) {
                    setSelectedSeller({ id: seller.id, name: seller.name });
                  }
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  width: '100%',
                  maxWidth: '300px',
                }}
              >
                <option value="" disabled>
                  Seleccione un vendedor
                </option>
                {usersByRoles?.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>

            </Box>
          )}

        </Box>

        <Box display="flex" flexDirection="column" gap={5} w="90%">
          <Box width={["100%", "60%", "30%"]} hidden={me?.role === "SELLER"}>
            <Input
              placeholder="Buscar por nombre y/o SKU"
              size="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <GridProducts products={products} />
        </Box>
      </Box>
    </Box>
  );
};
