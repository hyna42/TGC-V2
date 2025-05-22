import { useMeQuery } from "../generated/graphql-types";

export const useIsLoggedIn = () => {
  const { data } = useMeQuery();
  console.log("isAuth", data?.Me.isLoggedIn);
  return { isLoggedIn: data?.Me.isLoggedIn ?? false, name: data?.Me.name ?? "" };
};
