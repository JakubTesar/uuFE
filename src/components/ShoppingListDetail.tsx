import {useState} from 'react';
import {Edit2, Check, X} from 'lucide-react';
import {Button} from './ui/button';
import {Input} from './ui/input';
import {Badge} from './ui/badge';
import {ScrollArea} from './ui/scroll-area';
import {Separator} from './ui/separator';

import type {ShoppingListModel, User} from './mock-data';
import {MemberList} from "./MemberList";
import {ItemList} from "./ItemList";

interface ShoppingListDetailProps {
    list: ShoppingListModel | undefined;
    currentUser: User;
    allUsers: User[];
    onUpdateList: (listId: string, list: ShoppingListModel) => void;
}

export function ShoppingListItem({
                                     list,
                                     currentUser,
                                     allUsers,
                                     onUpdateList,
                                 }: ShoppingListDetailProps) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState('');

    if (!list) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Select a shopping list to view details</p>
            </div>
        );
    }
    const isOwner = list.ownerId === currentUser.id;

    const handleUpdateName = () => {
        if (editedName.trim() && editedName !== list.name) {
            onUpdateList(list.id,{...list, name: editedName.trim()});
        }
        setIsEditingName(false);
    };
    return (
        <div className="flex-1 flex flex-col bg-white">
            <ScrollArea className="flex-1">
                <div className="max-w-4xl mx-auto p-4 lg:p-6">
                    <div className="mb-6">
                        {isEditingName ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateName()}
                                    className="flex-1"
                                    autoFocus
                                />
                                <Button size="icon" onClick={handleUpdateName} variant="ghost">
                                    <Check className="h-4 w-4"/>
                                </Button>
                                <Button size="icon" onClick={() => setIsEditingName(false)} variant="ghost">
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <h2 className="text-gray-900">{list.name}</h2>
                                {isOwner && (
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => {
                                            setEditedName(list.name);
                                            setIsEditingName(true);
                                        }}
                                    >
                                        <Edit2 className="h-4 w-4"/>
                                    </Button>
                                )}
                                {list.archived && (
                                    <Badge variant="secondary">Archived</Badge>
                                )}
                            </div>
                        )}
                    </div>

                    <MemberList
                        list={list}
                        currentUser={currentUser}
                        allUsers={allUsers}
                        onUpdateList={onUpdateList}
                        isOwner={isOwner}
                    />

                    <Separator className="my-6"/>

                    <ItemList
                        list={list}
                        currentUser={currentUser}
                        allUsers={allUsers}
                        onUpdateList={onUpdateList}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}
