import express from "express";
import dotenv from "dotenv";
import { initApp } from "./src/AppRouter.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
initApp(app, express);

app.listen(PORT, () => {
  console.log(`server is running ..... ${PORT}`);
});
