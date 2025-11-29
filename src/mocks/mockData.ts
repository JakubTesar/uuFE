// src/mocks/mockData.ts

export type ShoppingListItem = {
    id: number;
    name: string;
    done: boolean;
};

export type ShoppingList = {
    id: number;
    name: string;
    items: ShoppingListItem[];
};

let nextListId = 3;
let nextItemId = 5;

// „reálná“ mock data
export let shoppingLists: ShoppingList[] = [
    {
        id: 1,
        name: "Víkendový nákup",
        items: [
            { id: 1, name: "Mléko", done: false },
            { id: 2, name: "Chléb", done: true }
        ]
    },
    {
        id: 2,
        name: "Grilovačka",
        items: [
            { id: 3, name: "Masíčko", done: false },
            { id: 4, name: "Uhlí", done: false }
        ]
    }
];

export function createShoppingList(name: string): ShoppingList {
    const list: ShoppingList = { id: nextListId++, name, items: [] };
    shoppingLists.push(list);
    return list;
}

export function deleteShoppingList(id: number) {
    shoppingLists = shoppingLists.filter((l) => l.id !== id);
}

export function addItem(listId: number, name: string): ShoppingListItem | null {
    const list = shoppingLists.find((l) => l.id === listId);
    if (!list) return null;
    const item: ShoppingListItem = { id: nextItemId++, name, done: false };
    list.items.push(item);
    return item;
}

export function toggleItemDone(listId: number, itemId: number): ShoppingListItem | null {
    const list = shoppingLists.find((l) => l.id === listId);
    if (!list) return null;
    const item = list.items.find((i) => i.id === itemId);
    if (!item) return null;
    item.done = !item.done;
    return item;
}
