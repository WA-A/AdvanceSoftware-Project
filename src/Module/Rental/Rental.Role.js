import { Roles } from "../../MiddleWare/auth.js";

export const EndPoints = {
  CreateRental: [Roles.User],
  GetRental: [Roles.Admin, Roles.User],
};
