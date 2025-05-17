import { Box } from "@chakra-ui/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      w="100%"
      h="100vh"
      bgColor="gray.200"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bgColor="red.400"
        w={{ base: "90%", lg: "30%" }}
        h="80%"
        alignItems="center"
        display="flex"
        flexDirection="column"
        rounded="lg"
      >
        <Box
          padding={5}
          w="100%"
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          rounded="lg"
          bgColor="white"
        >
          <Box w={{ sm: "100%", lg: "60%" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
