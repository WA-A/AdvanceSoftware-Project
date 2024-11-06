import { Roles } from "../../MiddleWare/auth.js";

export const EndPoints = {
  createDelivery: [Roles.User],
  //GetItems: [Roles.Admin, Roles.User],
};
