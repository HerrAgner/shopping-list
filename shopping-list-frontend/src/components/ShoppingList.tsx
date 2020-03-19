import React, {useEffect, useState} from "react"
import InputForm from "./InputForm";
import {Container, Grid, Hidden, IconButton, List, makeStyles, Typography} from "@material-ui/core";
import MongoApi from "../api/MongoApi";
import {list} from "../interfaces/list";
import {ItemInList} from "./ItemInList";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "2vw"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}));
const ShoppingList = () => {
    const classes = useStyles();
    const [lists, setLists] = useState([])
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        MongoApi.getAllLists("list").then(res => setLists(res))
    }, [update])

    const rerender = () => {
        setUpdate(update + 1)
    }

    const deleteList = (listId: string) => {
        if (listId) MongoApi.deleteList(listId, "list").then(() => rerender())
    }

    if (lists) {
        return (

            <Container className={classes.root}>
            <Grid item md={6} style={{display:"flex"}}>
                <Grid item md={2} implementation="css" component={Hidden} />
                <Grid item md={8}>
                    <InputForm rerender={rerender} lists={lists}/>
                </Grid>
            </Grid>

                <Grid item md={6}>
                    {lists.map((list: list) => {
                            return (
                            <div key={list._id}>
                                <div style={{display:"flex", backgroundColor:"lightgray", justifyContent:"center"}}>
                                <Typography variant="h6" style={{alignSelf:"center"}}>
                                    {list.listName}
                                </Typography>
                                <IconButton onClick={e => deleteList(list._id!)} edge="end">
                                    <DeleteIcon/>
                                </IconButton>
                                </div>
                                <div>
                                    <List dense={true}>
                                        {list.listItems.map(listItem => {
                                            return (
                                                <ItemInList
                                                    listId={list._id} listItem={listItem} rerender={rerender}
                                                    key={listItem._id} style={{backgroundColor: "beige"}}/>
                                            )
                                        })}

                                    </List>
                                </div>
                            </div>
                        )
                    })}
                </Grid>
            </Container>
        )
    } else {
        return (
            <div>loading</div>
        )
    }

}
export default ShoppingList
