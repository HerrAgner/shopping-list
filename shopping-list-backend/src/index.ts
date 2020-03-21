import { config } from "dotenv";
import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";
import router from "./api/endpoints";
import { connectToDb } from "./config/configDb";

config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/", router);

connectToDb();

export const startWebServer = () => {
  app.listen(process.env.DB_PORT);
};
