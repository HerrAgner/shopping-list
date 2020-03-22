import React, { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  InputLabel,
  ListItem as MaterialListItem,
  makeStyles,
  Select,
  TextField
} from "@material-ui/core";
import { listItem } from "../interfaces/list";

const useStyles = makeStyles(() => ({
  category: {
    width: "100%"
  }
}));

type ItemInputFieldProps = {
  setNewItem: Dispatch<SetStateAction<listItem>>;
  newItem: listItem;
};

const ItemInputFields = ({ setNewItem, newItem }: ItemInputFieldProps) => {
  const classes = useStyles();
  const { name, quantity, category } = newItem;

  const handleNewItemChange = (
    name: string | undefined,
    value: string | number | unknown
  ) => {
    if (name)
      setNewItem({
        ...newItem,
        [name]: value
      });
  };

  return (
    <div>
      <TextField
        margin="dense"
        name="name"
        label="Item name"
        type="text"
        onChange={data =>
          handleNewItemChange(data.target.name, data.target.value)
        }
        value={name}
        fullWidth
      />
      <TextField
        margin="dense"
        name="quantity"
        type="number"
        onChange={data =>
          handleNewItemChange(data.target.name, Number(data.target.value))
        }
        value={quantity}
        fullWidth
      />
      <FormControl className={classes.category}>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={category}
          onChange={data =>
            handleNewItemChange(data.target.name, data.target.value)
          }
        >
          <MaterialListItem value={"food"}>Food</MaterialListItem>
          <MaterialListItem value={"snack"}>Snack</MaterialListItem>
          <MaterialListItem value={"other"}>Other</MaterialListItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default ItemInputFields;
