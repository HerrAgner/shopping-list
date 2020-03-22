import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem as MaterialListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { listItem } from "../interfaces/list";
import Create from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ItemInputFields from "./ItemInputFields";

const useStyles = makeStyles(() => ({
  listItem: {
    backgroundColor: "rgb(255,248,232)"
  }
}));

type ListItemProps = {
  listId: string | undefined;
  listItem: listItem;
  deleteItem: (listId: string, _id: string, listIndex: number) => void;
  editItem: (
    listId: string,
    _id: string,
    newItem: listItem,
    listIndex: number
  ) => void;
  listIndex: number;
};

export const ListItem = ({
  listId,
  listItem,
  deleteItem,
  editItem,
  listIndex
}: ListItemProps) => {
  const classes = useStyles();
  const { name, quantity, category, _id } = listItem;
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState<listItem>({
    _id: _id,
    name: name,
    quantity: quantity,
    category: category
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApplyChanges = () => {
    if (
      listId &&
      _id &&
      newItem.name &&
      newItem.quantity > 0 &&
      newItem.category
    )
      editItem(listId, _id, newItem, listIndex);
    handleClose();
  };

  const handleDelete = () => {
    if (listId && _id) deleteItem(listId, _id, listIndex);
  };

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Add a new list"}</DialogTitle>
      <DialogContent>
        <ItemInputFields setNewItem={setNewItem} newItem={newItem} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleApplyChanges} color="primary" autoFocus>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      {dialog}
      <MaterialListItem className={classes.listItem}>
        <ListItemText
          primary={"Name: " + name}
          secondary={
            <React.Fragment>
              Quantity: {quantity}
              <br />
              Category: {category}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton onClick={handleOpen} edge="end">
            <Create />
          </IconButton>
          <IconButton onClick={handleDelete} edge="end">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </MaterialListItem>
    </div>
  );
};
