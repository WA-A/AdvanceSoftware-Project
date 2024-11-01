import { Roles } from "../../MiddleWare/auth.js";

export const EndPoints = {
  CreateItem: [Roles.Admin],
  GetItems: [Roles.Admin, Roles.User],
};
