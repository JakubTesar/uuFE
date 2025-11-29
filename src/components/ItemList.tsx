import {useState} from 'react';
import {Trash2, Plus} from 'lucide-react';
import {Button} from './ui/button';
import {Label} from './ui/label';
import type {ShoppingListItemModel, ShoppingListModel, User} from './mock-data';
import {Switch} from "./ui/switch";
import {Input} from "./ui/input";
import {Checkbox} from "./ui/checkbox";

interface ItemListProps {
    list: ShoppingListModel | undefined;
    currentUser: User;
    allUsers: User[];
    onUpdateList: (listId:string,list: ShoppingListModel) => void;
}

export function ItemList({list, currentUser, allUsers, onUpdateList}: ItemListProps) {
    if (!list) {
        return (
            <div className="p-4 text-gray-500">
                Vyber nákupní seznam vlevo, aby se zobrazily položky.
            </div>
        );
    }
    const [newItemText, setNewItemText] = useState('');
    const [showResolved, setShowResolved] = useState(false);

    const handleAddItem = () => {
        if (newItemText.trim()) {
            const newItem: ShoppingListItemModel = {
                id: `item-${Date.now()}`,
                text: newItemText.trim(),
                resolved: false,
                addedBy: currentUser.id,
            };
            onUpdateList(list.id,{...list, items: [...list.items, newItem]});
            setNewItemText('');
        }
    };
    const handleToggleItem = (itemId: string) => {
        onUpdateList(list.id,{
            ...list,
            items: list.items.map(item =>
                item.id === itemId ? {...item, resolved: !item.resolved} : item
            ),
        });
    };
    const handleRemoveItem = (itemId: string) => {
        onUpdateList(list.id,{
            ...list,
            items: list.items.filter(item => item.id !== itemId),
        });
    };
    const displayedItems = list.items
        ? (showResolved ? list.items : list.items.filter(item => !item.resolved))
        : [];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900">Shopping Items</h3>
                <div className="flex items-center gap-2">
                    <Label htmlFor="show-resolved" className="text-sm text-gray-600">
                        Show resolved
                    </Label>
                    <Switch
                        id="show-resolved"
                        checked={showResolved}
                        onCheckedChange={setShowResolved}
                    />
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <Input
                    placeholder="Add new item..."
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                    className="flex-1"
                />
                <Button onClick={handleAddItem}>
                    <Plus className="h-4 w-4 mr-1"/>
                    Add
                </Button>
            </div>

            <div className="space-y-2">
                {displayedItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        {showResolved ? 'No items in this list' : 'No unresolved items'}
                    </div>
                ) : (
                    displayedItems.map(item => {
                        const addedByUser = allUsers.find(u => u.id === item.addedBy);
                        return (
                            <div
                                key={item.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border ${
                                    item.resolved ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                                }`}
                            >
                                <Checkbox
                                    checked={item.resolved}
                                    onCheckedChange={() => handleToggleItem(item.id)}
                                />
                                <div className="flex-1">
                                    <p className={item.resolved ? 'line-through text-gray-500' : 'text-gray-900'}>
                                        {item.text}
                                    </p>
                                    {addedByUser && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Added by {addedByUser.name}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-600"/>
                                </Button>
                            </div>
                        );
                    })
                )}
            </div>
            {list.items.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                        {list.items.filter(i => i.resolved).length} of {list.items.length} items completed
                    </p>
                </div>)}
        </div>

    );
}
