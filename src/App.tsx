import { useState } from 'react';
import { ShoppingListList } from './components/ShoppingListList';
import { ShoppingListItem } from './components/ShoppingListDetail';
import { mockLists, mockUsers, type ShoppingListModel, type User } from './components/mock-data';

export default function App() {
  const [currentUser] = useState<User>(mockUsers[0]); // Mock current user
  const [selectedListId, setSelectedListId] = useState<string | null>(mockLists[0].id);
  const [lists, setLists] = useState<ShoppingListModel[]>(mockLists);
  const [showArchived, setShowArchived] = useState(false);

  const accessibleLists = lists.filter(list => {
    const hasAccess = list.ownerId === currentUser.id || list.memberIds.includes(currentUser.id);
    const matchesArchiveFilter = showArchived ? list.archived : !list.archived;
    return hasAccess && matchesArchiveFilter;
  });

  const selectedList = lists.find(list => list.id === selectedListId);

  const handleCreateList = (name: string) => {
    const newList: ShoppingListModel = {
      id: `list-${Date.now()}`,
      name,
      ownerId: currentUser.id,
      memberIds: [],
      items: [],
      archived: false,
    };
    setLists([newList, ...lists]);
    setSelectedListId(newList.id);
  };

  const handleDeleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
    if (selectedListId === listId) {
      setSelectedListId(accessibleLists[0]?.id || null);
    }
  };

  const handleArchiveList = (listId: string) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, archived: !list.archived } : list
    ));
  };

  const handleUpdateList = (updatedList: ShoppingListModel) => {
    setLists(lists.map(list => 
      list.id === updatedList.id ? updatedList : list
    ));
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
        onToggleArchived={() => setShowArchived(!showArchived)}
      />
      <ShoppingListItem
        list={selectedList}
        currentUser={currentUser}
        allUsers={mockUsers}
        onUpdateList={handleUpdateList}
      />
    </div>
  );
}
