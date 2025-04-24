import { loginUser } from "./auth/login.action";
import { logout } from "./auth/logout.action";
import { registerUser } from "./auth/register.action";

export const server = {
  //actions
  registerUser,
  logout,
  loginUser,
};
