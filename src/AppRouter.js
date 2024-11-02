import { ConnectDB } from "../DB/Connection.js";
import AuthRouter from "./Module/Auth/Auth.Router.js";
import UserRouter from "./Module/User/User.Router.js";
import ItemRouter from "./Module/Item/Item.Router.js";
import ReviewRouter from "./Module/Reviews/Review.Router.js";
import RentalRouter from "./Module/Rental/Rental.Router.js";

import cors from "cors";

export const initApp = (app, express) => {
  app.use(cors());
  ConnectDB();

  app.use(express.json());
  app.get("/", (req, res) => {
    return res.json({ message: "Welcome" }); // Main Page
  });
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/item", ItemRouter);
  app.use("/review", ReviewRouter);
  app.use("/rental", RentalRouter);

  app.use("*", (req, res) => {
    return res.json({ message: "Page Not Found" }); // end point not found
  });
};
