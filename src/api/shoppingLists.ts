import type { ShoppingListModel } from "../components/mock-data";

const BASE = "/api";

export async function getShoppingLists(): Promise<ShoppingListModel[]> {
    const res = await fetch(`${BASE}/shopping-lists`);
    if (!res.ok) throw new Error("Failed to load shopping lists");
    return res.json();
}

export async function createShoppingList(
    name: string,
    ownerId: string
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, ownerId }),
    });
    if (!res.ok) throw new Error("Failed to create list");
    return res.json();
}

export async function patchShoppingList(
    id: string,
    patch: Partial<ShoppingListModel>
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error("Failed to update list");
    return res.json();
}

export async function deleteShoppingList(id: string): Promise<void> {
    const res = await fetch(`${BASE}/shopping-lists/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete list");
}

export async function addMemberToList(
    listId: string,
    userId: string
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists/${listId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("Failed to add member");
    return res.json();
}

export async function removeMemberFromList(
    listId: string,
    userId: string
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists/${listId}/members/${userId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove member");
    return res.json();
}

export async function addItemToList(
    listId: string,
    text: string
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists/${listId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to add item");
    return res.json();
}

export async function toggleItemResolved(
    listId: string,
    itemId: string
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists/${listId}/items/${itemId}/toggle`, {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("Failed to toggle item");
    return res.json();
}

export async function deleteItemFromList(
    listId: string,
    itemId: string
): Promise<ShoppingListModel> {
    const res = await fetch(`${BASE}/shopping-lists/${listId}/items/${itemId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete item");
    return res.json();
}
