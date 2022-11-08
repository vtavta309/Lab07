import { useSelector } from "react-redux";

export function useIsLogin() {
  const login = useSelector((state) => state.userSlice.login);
  return {
    isLogin: login,
  };
}
