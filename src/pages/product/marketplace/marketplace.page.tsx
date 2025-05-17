import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { Box } from "@chakra-ui/react";
import { MarketPlaceBuyerComponent } from "../../../components/marketplace/marketplace-buyer";
import { useEffect } from "react";
import { getUserThunk } from "../../../store/user/user.slice";

const MarketplacePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { me } = useSelector((state: RootState) => state.user);

  const getUserMe = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(getUserThunk());
    }
  }

  useEffect(() => {
    if (!me) {
      getUserMe();
    }
  }, [dispatch]);

  return (
    <Box>
      <MarketPlaceBuyerComponent />
    </Box>
  )
}

export default MarketplacePage