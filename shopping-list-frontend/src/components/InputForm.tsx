import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { list, listItem } from "../interfaces/list";
import ItemInputFields from "./ItemInputFields";
import { ObjectID } from "bson";

const useStyles = makeStyles(() => ({
  button: {
    margin: "2vh"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }
}));

type InputFormProps = {
  lists: list[];
  addItem: (
    newItem: listItem,
    currentListId: string,
    listIndex: number
  ) => void;
  addList: (newList: string) => void;
};

const InputForm = ({ lists, addItem, addList }: InputFormProps) => {
  const classes = useStyles();
  const [newItem, setNewItem] = useState<listItem>({
    _id: new ObjectID().toString(),
    name: "",
    quantity: 0,
    category: ""
  });
  const [currentListId, setCurrentListId] = useState("");
  const [open, setOpen] = useState(false);
  const [newList, setNewList] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListChange = (value: string) => {
    setCurrentListId(value);
  };

  const handleAddItem = () => {
    if (
      newItem.name &&
      newItem.quantity > 0 &&
      newItem.category &&
      currentListId
    ) {
      addItem(
        newItem,
        currentListId,
        lists.findIndex((list: list) => list._id === currentListId)
      );
      setNewItem({
        _id: new ObjectID().toString(),
        name: "",
        quantity: 0,
        category: ""
      });
    }
  };
  const createNewList = () => {
    if (newList) addList(newList);
    handleClose();
  };

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Add a new list"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="List name"
          type="text"
          onChange={data => setNewList(data.target.value)}
          value={newList}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={createNewList} color="primary" autoFocus>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.form}>
      {dialog}
      <Typography variant="h6">Choose list</Typography>
      <FormControl>
        <InputLabel>List</InputLabel>
        <Select
          value={currentListId}
          onChange={event => handleListChange(event.target.value as string)}
        >
          {lists.map((list: list) => {
            return (
              <MenuItem key={list._id + "selectList"} value={list._id}>
                {list.listName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        className={classes.button}
        onClick={handleOpen}
        variant="contained"
      >
        Create new list
      </Button>
      <Typography variant="h6">Item details</Typography>
      <ItemInputFields setNewItem={setNewItem} newItem={newItem} />
      <Button
        className={classes.button}
        onClick={handleAddItem}
        variant="contained"
      >
        Add item
      </Button>
    </div>
  );
};

export default InputForm;
