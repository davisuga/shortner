import express from "express";
import { appRoutes } from "./routes";

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(appRoutes);
  app.listen(3000, () =>
    console.log("REST API server ready at: http://localhost:3000")
  );
};
