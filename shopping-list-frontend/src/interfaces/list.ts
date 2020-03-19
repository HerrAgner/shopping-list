export interface list {
    _id?: string,
    listName: string,
    listItems: listItem[]
}

export interface listItem {
    _id?: string,
    name: string,
    quantity: number,
    category: string
}
