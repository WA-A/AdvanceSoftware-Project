import { Roles } from "../../MiddleWare/auth.js";

export const EndPoints = {
  CreateReview: [Roles.Admin, Roles.User],
  UpdateReview: [Roles.Admin, Roles.User],
  DeleteReview: [Roles.Admin, Roles.User],
  GetItemReviews: [Roles.Admin, Roles.User],
};
