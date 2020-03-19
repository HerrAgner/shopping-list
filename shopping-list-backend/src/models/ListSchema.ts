import * as mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
    listName: {type: String, required: true},
    listItems: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        category: {type: String, required: true}
    }]
});

const List: mongoose.Model<any> = mongoose.model("list", ListSchema);

export default List
