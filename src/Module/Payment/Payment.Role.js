import { Roles } from "../../MiddleWare/auth.js";

export const EndPoints = {
  CreatePayment: [Roles.User],
  GetPayment: [Roles.User],
};
