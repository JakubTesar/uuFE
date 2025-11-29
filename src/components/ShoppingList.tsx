import {Archive, ArchiveRestore, Trash2, Crown} from 'lucide-react';
import {Button} from './ui/button';
import {Badge} from './ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from './ui/alert-dialog';
import type {ShoppingListModel, User} from './mock-data';

interface ShoppingListProps {
    list: ShoppingListModel;
    currentUser: User;
    selectedListId: string | null;
    showArchived: boolean;
    onSelectList: (listId: string) => void;
    onDeleteList: (listId: string) => void;
    onArchiveList: (listId: string) => void;
    onToggleArchived: () => void;
}

export function ShoppingList({
                                 list,
                                 currentUser,
                                 selectedListId,
                                 onSelectList,
                                 onArchiveList,
                                 onDeleteList,
                             }: ShoppingListProps) {
    if (!list) {
        return null;
    }
    const isOwner = list.ownerId === currentUser.id;
    const unresolvedCount =
        Array.isArray((list as any).items)
            ? list.items.filter(item => !item.resolved).length
            : (list as any).itemsRemaining ?? 0;

    return (
        <div
            key={list.id}
            className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                selectedListId === list.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
            onClick={() => onSelectList(list.id)}
        >
            <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        {isOwner && <Crown className="h-3 w-3 text-yellow-600"/>}
                        <span className="text-gray-900">{list.name}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {unresolvedCount} item{unresolvedCount !== 1 ? 's' : ''} remaining
                    </div>
                </div>
                {list.archived && (
                    <Badge variant="secondary" className="ml-2">
                        Archived
                    </Badge>
                )}
            </div>

            {isOwner && (
                <div className="flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onArchiveList(list.id)}
                        className="flex-1 h-7 text-xs"
                    >
                        {list.archived ? (
                            <>
                                <ArchiveRestore className="h-3 w-3 mr-1"/>
                                Unarchive
                            </>
                        ) : (
                            <>
                                <Archive className="h-3 w-3 mr-1"/>
                                Archive
                            </>
                        )}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                                <Trash2 className="h-3 w-3 text-red-600"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Shopping List</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "{list.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDeleteList(list.id)}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    );
}
