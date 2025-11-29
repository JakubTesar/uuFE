import { http, HttpResponse } from "msw";
import {
    mockLists,
    type ShoppingListModel,
    type ShoppingListItemModel,
} from "../components/mock-data";

let lists: ShoppingListModel[] = mockLists.map((l) => ({ ...l }));


function findList(id: string): ShoppingListModel | undefined {
    return lists.find((l) => l.id === id);
}

export const handlers = [
    http.get("/api/shopping-lists", () => {
        return HttpResponse.json(lists);
    }),

    http.post("/api/shopping-lists", async ({ request }) => {
        const body = (await request.json()) as any;
        const name = String(body.name ?? "");
        const ownerId = String(body.ownerId ?? "");

        const newList: ShoppingListModel = {
            id: `list-${Date.now()}`,
            name,
            ownerId,
            archived: false,
            memberIds: [],
            items: [],
        };

        lists = [newList, ...lists];

        return HttpResponse.json(newList, { status: 201 });
    }),

    http.patch("/api/shopping-lists/:id", async ({ params, request }) => {
        const { id } = params as { id: string };
        const patch = (await request.json()) as Partial<ShoppingListModel>;

        const existing = findList(id);
        if (!existing) return new HttpResponse(null, { status: 404 });

        const updated: ShoppingListModel = {
            ...existing,
            ...patch,
        };

        lists = lists.map((l) => (l.id === id ? updated : l));

        return HttpResponse.json(updated);
    }),

    http.delete("/api/shopping-lists/:id", ({ params }) => {
        const { id } = params as { id: string };
        lists = lists.filter((l) => l.id !== id);
        return new HttpResponse(null, { status: 204 });
    }),

    http.post("/api/shopping-lists/:id/members", async ({ params, request }) => {
        const { id } = params as { id: string };
        const body = (await request.json()) as any;
        const userId = String(body.userId ?? "");

        const list = findList(id);
        if (!list) return new HttpResponse(null, { status: 404 });

        if (!list.memberIds.includes(userId)) {
            list.memberIds = [...list.memberIds, userId];
        }

        lists = lists.map((l) => (l.id === id ? list : l));

        return HttpResponse.json(list);
    }),

    http.delete("/api/shopping-lists/:id/members/:userId", ({ params }) => {
        const { id, userId } = params as { id: string; userId: string };

        const list = findList(id);
        if (!list) return new HttpResponse(null, { status: 404 });

        list.memberIds = list.memberIds.filter((m) => m !== userId);
        lists = lists.map((l) => (l.id === id ? list : l));

        return HttpResponse.json(list);
    }),

    http.post("/api/shopping-lists/:id/items", async ({ params, request }) => {
        const { id } = params as { id: string };
        const body = (await request.json()) as any;
        const text = String(body.text ?? "");

        const list = findList(id);
        if (!list) return new HttpResponse(null, { status: 404 });

        const newItem: ShoppingListItemModel = {
            id: `item-${Date.now()}`,
            text,
            resolved: false,
            addedBy: body.addedBy ?? "mock-user",
        };

        list.items = [...list.items, newItem];
        lists = lists.map((l) => (l.id === id ? list : l));

        return HttpResponse.json(list);
    }),

    http.patch("/api/shopping-lists/:id/items/:itemId/toggle", ({ params }) => {
        const { id, itemId } = params as { id: string; itemId: string };

        const list = findList(id);
        if (!list) return new HttpResponse(null, { status: 404 });

        list.items = list.items.map((item) =>
            item.id === itemId ? { ...item, resolved: !item.resolved } : item
        );
        lists = lists.map((l) => (l.id === id ? list : l));

        return HttpResponse.json(list);
    }),

    http.delete("/api/shopping-lists/:id/items/:itemId", ({ params }) => {
        const { id, itemId } = params as { id: string; itemId: string };

        const list = findList(id);
        if (!list) return new HttpResponse(null, { status: 404 });

        list.items = list.items.filter((item) => item.id !== itemId);
        lists = lists.map((l) => (l.id === id ? list : l));

        return HttpResponse.json(list);
    }),
];
