import {useState} from 'react';
import {Plus, Archive, ArchiveRestore} from 'lucide-react';
import {Button} from './ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from './ui/dialog';
import {Input} from './ui/input';
import {Label} from './ui/label';
import {ScrollArea} from './ui/scroll-area';
import type {ShoppingListModel, User} from './mock-data';
import {ShoppingList} from './ShoppingList';

interface ShoppingListListProps {
    lists: ShoppingListModel[];
    currentUser: User;
    selectedListId: string | null;
    showArchived: boolean;
    onSelectList: (listId: string) => void;
    onCreateList: (name: string) => void;
    onDeleteList: (listId: string) => void;
    onArchiveList: (listId: string) => void;
    onToggleArchived: () => void;
}

export function ShoppingListList({
                                     lists,
                                     currentUser,
                                     selectedListId,
                                     showArchived,
                                     onSelectList,
                                     onCreateList,
                                     onDeleteList,
                                     onArchiveList,
                                     onToggleArchived,
                                 }: ShoppingListListProps) {
    const [newListName, setNewListName] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCreateList = () => {
        if (newListName.trim()) {
            onCreateList(newListName.trim());
            setNewListName('');
            setDialogOpen(false);
        }
    };

    return (
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <h1 className="text-gray-900">Shopping Lists</h1>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm">
                                <Plus className="h-4 w-4 mr-1"/>
                                New List
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Shopping List</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div>
                                    <Label htmlFor="list-name">List Name</Label>
                                    <Input
                                        id="list-name"
                                        placeholder="Enter list name..."
                                        value={newListName}
                                        onChange={(e) => setNewListName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCreateList()}
                                    />
                                </div>
                                <Button onClick={handleCreateList} className="w-full">
                                    Create List
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="text-gray-600 text-sm mb-2">
                    Logged in as: <span className="text-gray-900">{currentUser.name}</span>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleArchived}
                    className="w-full"
                >
                    {showArchived ? (
                        <>
                            <ArchiveRestore className="h-4 w-4 mr-2"/>
                            Show Active Lists
                        </>
                    ) : (
                        <>
                            <Archive className="h-4 w-4 mr-2"/>
                            Show Archived Lists
                        </>
                    )}
                </Button>
            </div>

            {/* Lists */}
            <ScrollArea className="flex-1">
                <div className="p-2">
                    {lists.length === 0 ? (
                        <div className="text-center py-8 px-4 text-gray-500">
                            {showArchived ? 'No archived lists' : 'No active lists'}
                        </div>
                    ) : (
                        lists.map((list) => (
                            <ShoppingList
                                list={list}
                                onDeleteList={onDeleteList}
                                onArchiveList={onArchiveList}
                                onSelectList={onSelectList}
                                onToggleArchived={onToggleArchived}
                                currentUser={currentUser}
                                selectedListId={selectedListId}
                                showArchived={false}/>
                        ))
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
