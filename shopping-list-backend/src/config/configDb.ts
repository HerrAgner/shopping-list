import { connect, set, connection } from "mongoose";
import { startWebServer } from "../index";

export const connectToDb = () => {
  const dbName: string = process.env.DB_NAME;
  connect(
    `mongodb://localhost/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );

  set("useCreateIndex", true);
  connection.once("open", () => {
    startWebServer();
  });
};
