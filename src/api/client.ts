// src/api/client.ts

import type { ShoppingList, ShoppingListItem } from "../mocks/mockData";

const API_BASE = "/api";

export const api = {
    async getShoppingLists(): Promise<ShoppingList[]> {
        const res = await fetch(`${API_BASE}/shopping-lists`);
        if (!res.ok) throw new Error("Failed to load shopping lists");
        return res.json();
    },

    async getShoppingList(id: number): Promise<ShoppingList> {
        const res = await fetch(`${API_BASE}/shopping-lists/${id}`);
        if (!res.ok) throw new Error("Failed to load shopping list");
        return res.json();
    },

    async createShoppingList(name: string): Promise<ShoppingList> {
        const res = await fetch(`${API_BASE}/shopping-lists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        if (!res.ok) throw new Error("Failed to create shopping list");
        return res.json();
    },

    async deleteShoppingList(id: number): Promise<void> {
        const res = await fetch(`${API_BASE}/shopping-lists/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete shopping list");
    },

    async addItem(listId: number, name: string): Promise<ShoppingListItem> {
        const res = await fetch(`${API_BASE}/shopping-lists/${listId}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
    },

    async toggleItemDone(listId: number, itemId: number): Promise<ShoppingListItem> {
        const res = await fetch(`${API_BASE}/shopping-lists/${listId}/items/${itemId}`, {
            method: "PATCH"
        });
        if (!res.ok) throw new Error("Failed to toggle item");
        return res.json();
    }
};
