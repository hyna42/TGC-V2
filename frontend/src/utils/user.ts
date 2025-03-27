import { useMeQuery } from "../generated/graphql-types";


export const useIsLoggedIn = () => {
  const { data } = useMeQuery();
  console.log("isAuth", data?.Me.isLoggedIn);
  return data?.Me.isLoggedIn;
};
