export type User = {
    id: string;
    name: string;
    email: string;
};

export type ShoppingListItemModel = {
    id: string;
    text: string;
    resolved: boolean;
    addedBy: string;
};

export type ShoppingListModel = {
    id: string;
    name: string;
    ownerId: string;
    memberIds: string[];
    archived: boolean;
    items: ShoppingListItemModel[];
};

export const mockUsers: User[] = [
    { id: "user-1", name: "Alice", email: "alice@example.com" },
    { id: "user-2", name: "Bob", email: "bob@example.com" },
    { id: "user-3", name: "Charlie", email: "charlie@example.com" },
];

export const mockLists: ShoppingListModel[] = [
    {
        id: "list-1",
        name: "Týdenní nákup",
        ownerId: "user-1",
        memberIds: ["user-2"],
        archived: false,
        items: [
            { id: "item-1", text: "Mléko", resolved: false, addedBy: "user-1" },
            { id: "item-2", text: "Chleba", resolved: true, addedBy: "user-2" },
        ],
    },
    {
        id: "list-2",
        name: "Víkendová grilovačka",
        ownerId: "user-2",
        memberIds: ["user-1", "user-3"],
        archived: false,
        items: [
            { id: "item-3", text: "Steaky", resolved: false, addedBy: "user-2" },
            { id: "item-4", text: "Uhlí", resolved: false, addedBy: "user-3" },
        ],
    },
    {
        id: "list-3",
        name: "Starý seznam (archivovaný)",
        ownerId: "user-1",
        memberIds: [],
        archived: true,
        items: [
            { id: "item-5", text: "Dárky k Vánocům", resolved: true, addedBy: "user-1" },
        ],
    },
];
