import { Schema, model, Model, Document } from "mongoose";

const ListSchema = new Schema({
  listName: { type: String, required: true },
  listItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      category: { type: String, required: true }
    }
  ]
});

const List: Model<Document> = model("list", ListSchema);

export default List;
