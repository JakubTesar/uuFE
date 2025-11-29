import { useEffect, useState } from "react";
import { ShoppingListList } from "./components/ShoppingListList";
import { ShoppingListItem } from "./components/ShoppingListDetail";
import { mockUsers, type ShoppingListModel } from "./components/mock-data";
import {
    getShoppingLists,
    createShoppingList,
    deleteShoppingList as apiDeleteList,
    patchShoppingList,
} from "./api/shoppingLists";


export default function App() {
    const [currentUser] = useState(mockUsers[0]);
    const [allUsers] = useState(mockUsers);

    const [lists, setLists] = useState<ShoppingListModel[]>([]);
    const [selectedListId, setSelectedListId] = useState<string | null>(null);
    const [showArchived, setShowArchived] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                const serverLists = await getShoppingLists();
                setLists(serverLists);
                setSelectedListId(serverLists[0]?.id ?? null);
            } catch (e) {
                setError("Nepodařilo se načíst shopping listy.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <p>Loading shopping lists…</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <p>{error}</p>
            </div>
        );
    }

    const accessibleLists = lists.filter((list) => {
        const hasAccess =
            list.ownerId === currentUser.id || list.memberIds.includes(currentUser.id);
        const matchesArchiveFilter = showArchived ? list.archived : !list.archived;
        return hasAccess && matchesArchiveFilter;
    });

    const selectedList = lists.find(list => list.id === selectedListId) ?? null;

    const handleCreateList = async (name: string) => {
        const created = await createShoppingList(name, currentUser.id);
        setLists(prev => [created, ...prev]);
        setSelectedListId(created.id);
    };

    const handleDeleteList = async (listId: string) => {
        await apiDeleteList(listId);
        setLists(prev => prev.filter(l => l.id !== listId));
        if (selectedListId === listId) {
            setSelectedListId(null);
        }
    };

    const handleArchiveList = async (listId: string) => {
        const list = lists.find(l => l.id === listId);
        if (!list) return;
        const updated = await patchShoppingList(listId, { archived: !list.archived });
        setLists(prev => prev.map(l => (l.id === updated.id ? updated : l)));
    };

    const handleUpdateList = async (listId: string, updatedList: ShoppingListModel) => {
        const list = lists.find(l => l.id === listId);
        if (!list) return;
        const updated = await patchShoppingList(listId, updatedList);
        setLists(prev => prev.map(l => (l.id === updated.id ? updated : l)));
    };


    return (
        <div className="h-screen flex flex-col lg:flex-row bg-gray-50">
            <ShoppingListList
                lists={accessibleLists}
                currentUser={currentUser}
                selectedListId={selectedListId}
                showArchived={showArchived}
                onSelectList={setSelectedListId}
                onCreateList={handleCreateList}
                onDeleteList={handleDeleteList}
                onArchiveList={handleArchiveList}
                onToggleArchived={() => setShowArchived((v) => !v)}
            />
            <ShoppingListItem
                list={selectedList}
                currentUser={currentUser}
                allUsers={allUsers}
                onUpdateList={handleUpdateList}
            />
        </div>
    );
}
