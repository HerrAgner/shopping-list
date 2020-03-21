import * as mongoose from "mongoose";
import { startWebServer } from "../index";

export const connectToDb = () => {
  const dbName: string = process.env.DB_NAME;
  mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.set("useCreateIndex", true);
  mongoose.connection.once("open", () => {
    startWebServer();
  });
};
