// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import {
    shoppingLists,
    createShoppingList,
    deleteShoppingList,
    addItem,
    toggleItemDone
} from "./mockData";

const API_BASE = "/api";

export const handlers = [
    // GET /api/shopping-lists – přehled seznamů
    http.get(`${API_BASE}/shopping-lists`, () => {
        return HttpResponse.json(shoppingLists);
    }),

    // GET /api/shopping-lists/:id – detail seznamu
    http.get(`${API_BASE}/shopping-lists/:id`, ({ params }) => {
        const id = Number(params.id);
        const list = shoppingLists.find((l) => l.id === id);
        if (!list) {
            return new HttpResponse("Not found", { status: 404 });
        }
        return HttpResponse.json(list);
    }),

    // POST /api/shopping-lists – založení seznamu { name }
    http.post(`${API_BASE}/shopping-lists`, async ({ request }) => {
        const body = (await request.json()) as { name: string };
        const list = createShoppingList(body.name);
        return HttpResponse.json(list, { status: 201 });
    }),

    // DELETE /api/shopping-lists/:id – smazání seznamu
    http.delete(`${API_BASE}/shopping-lists/:id`, ({ params }) => {
        const id = Number(params.id);
        deleteShoppingList(id);
        return new HttpResponse(null, { status: 204 });
    }),

    // POST /api/shopping-lists/:id/items – přidání položky { name }
    http.post(`${API_BASE}/shopping-lists/:id/items`, async ({ params, request }) => {
        const listId = Number(params.id);
        const body = (await request.json()) as { name: string };
        const item = addItem(listId, body.name);
        if (!item) return new HttpResponse("List not found", { status: 404 });
        return HttpResponse.json(item, { status: 201 });
    }),

    // PATCH /api/shopping-lists/:listId/items/:itemId – toggle done
    http.patch(`${API_BASE}/shopping-lists/:listId/items/:itemId`, ({ params }) => {
        const listId = Number(params.listId);
        const itemId = Number(params.itemId);
        const item = toggleItemDone(listId, itemId);
        if (!item) return new HttpResponse("Not found", { status: 404 });
        return HttpResponse.json(item);
    })
];
