import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, ListItem,
    MenuItem,
    Select,
    TextField,
    Paper, Typography
} from "@material-ui/core";
import {list, listItem} from "../interfaces/list";
import MongoApi from "../api/MongoApi";

const InputForm = (props: any) => {
    const [form, setForm] = useState<listItem>({name: "", quantity: 0, category: ""})
    const [currentList, setCurrentList] = useState('')
    const [open, setOpen] = React.useState(false);
    const [newList, setNewList] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewItemChange = (event: React.ChangeEvent<any>) => {
        setForm({
            ...form,
            [event.target!.name]: event.target!.value
        });
    };

    const handleChange = (event: any) => {
        setCurrentList(event.target.value);
    };

    const onSubmit = () => {
        if (form.name && form.quantity && form.category && currentList) {
            MongoApi.addItemToList(form, "list", currentList).then(res => props.rerender())
        }
    }
    const createNewList = () => {
        if (newList) MongoApi.createList({listName: newList}, "list").then(res => {
            setCurrentList(newList)
            props.rerender()
        })
        handleClose()
    }

    return (
        <form style={{display: "flex",
            flexDirection: "column",
            width: "100%"}}>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Add a new list"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="List name"
                        type="text"
                        onChange={(data: any) => setNewList(data.target.value)}
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
            <Typography variant="h6">
               Choose list
            </Typography>
            <FormControl>
                <InputLabel>List</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentList}
                    onChange={handleChange}
                >
                    {props.lists.map((list: list) => {
                        return (
                            <MenuItem key={list._id + "selectList"} value={list._id}>{list.listName}</MenuItem>
                        )
                    })}

                </Select>
            </FormControl>
            <Button onClick={handleOpen} style={{margin: "2vh"}} variant="contained">Create new list</Button>
            <Typography variant="h6">
                Item details
            </Typography>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                onChange={(data: any) => handleNewItemChange(data)}
                value={form.name}
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                name="quantity"
                label="Quantity"
                type="number"
                onChange={(data: any) => handleNewItemChange(data)}
                value={form.quantity}
                fullWidth
            />
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={form.category}
                    onChange={data => handleNewItemChange(data)}
                >
                    <ListItem value={"food"}>Food</ListItem>
                    <ListItem value={"snack"}>Snack</ListItem>
                    <ListItem value={"other"}>Other</ListItem>
                </Select>
            </FormControl>

                <Button onClick={onSubmit} style={{marginTop: "1vh"}} variant="contained">Add item</Button>
        </form>
    )
}

export default InputForm
