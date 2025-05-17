import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { User } from "../../../types/user.types";
import DashboardWithoutAuth from "../../../components/dashboard/dashboard-without-auth.component";
import DashboardWithAuth from "../../../components/dashboard/dashboard-with.auth";

export const DashboardAInventoryPage = () => {
  const user = useSelector((state: RootState) => state.user.me) as User | null;

  return (
    <Box height={"100%"}>
      {user ? (<DashboardWithAuth />) : (<DashboardWithoutAuth />)}
    </Box>
  )
}
