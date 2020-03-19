import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Select,
    TextField
} from "@material-ui/core";
import {listItem} from "../interfaces/list";
import Create from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import MongoApi from "../api/MongoApi";

export const ItemInList = (props: any) => {
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState<listItem>({name: "", quantity: 0, category: ""})
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setNewItem({name: props.listItem.name, quantity: props.listItem.quantity, category: props.listItem.category})
    },[])

    const handleNewItemChange = (event: React.ChangeEvent<any>) => {
        setNewItem({
            ...newItem,
            [event.target.name]: event.target!.value
        });
    };

    const applyChanges = () => {
        MongoApi.editListItem(props.listId, props.listItem._id, newItem, "list").then(() => props.rerender())
        handleClose()
    }

    const deleteItem = () => {
        MongoApi.deleteListItem(props.listId, props.listItem._id, "list").then(() => props.rerender())
    }

    return (
        <div>
          <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Add a new list"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Item name"
              type="text"
              onChange={(data: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleNewItemChange(data)}
              value={newItem.name}
              fullWidth
            />
              <TextField
                  autoFocus
                  margin="dense"
                  name="quantity"
                  label="quantity"
                  type="number"
                  onChange={data => handleNewItemChange(data)}
                  value={newItem.quantity}
                  fullWidth
              />
              <FormControl style={{width: "100%"}}>
              <InputLabel>Category</InputLabel>
              <Select
                  id="select-category-edit"
                  name="category"
                  value={newItem.category}
                  onChange={data => handleNewItemChange(data)}
              >

                  <ListItem value={"food"}>Food</ListItem>
                  <ListItem value={"snack"}>Snack</ListItem>
                  <ListItem value={"other"}>Other</ListItem>
              </Select>
              </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={applyChanges} color="primary" autoFocus>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
            <ListItem style={{backgroundColor: "beige"}}>
                <ListItemText
                    primary={"Name: "+ props.listItem.name}
                    secondary={
                        <React.Fragment>
                            Quantity: {props.listItem.quantity}
                            <br />
                            Category: {props.listItem.category}
                        </React.Fragment>}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={handleOpen} edge="end">
                        <Create/>
                    </IconButton>
                    <IconButton onClick={deleteItem} edge="end">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )
}
