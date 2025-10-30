import {useState} from 'react';
import {Trash2, Crown, UserPlus, LogOut} from 'lucide-react';
import {Button} from './ui/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from './ui/dialog';
import {Label} from './ui/label';
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
import type { ShoppingListModel, User} from './mock-data';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select";
import {Avatar, AvatarFallback} from "./ui/avatar";

interface MemberListProps {
    list: ShoppingListModel | undefined;
    currentUser: User;
    allUsers: User[];
    onUpdateList: (list: ShoppingListModel) => void;
    isOwner: boolean;
}

export function MemberList({list, currentUser, allUsers, onUpdateList, isOwner}: MemberListProps) {
    const owner = allUsers.find(u => u.id === list.ownerId);
    const members = allUsers.filter(u => list.memberIds.includes(u.id));
    const [selectedUserId, setSelectedUserId] = useState('');
    const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    const handleLeavelist = () => {
        onUpdateList({
            ...list,
            memberIds: list.memberIds.filter(id => id !== currentUser.id),
        });
    };
    const handleRemoveMember = (userId: string) => {
        onUpdateList({
            ...list,
            memberIds: list.memberIds.filter(id => id !== userId),
        });
    };
    const handleAddMember = () => {
        if (selectedUserId) {
            onUpdateList({
                ...list,
                memberIds: [...list.memberIds, selectedUserId],
            });
            setSelectedUserId('');
            setAddMemberDialogOpen(false);
        }
    };
    const availableUsers = allUsers.filter(
        u => u.id !== list.ownerId && !list.memberIds.includes(u.id)
    );

    return (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-900">Members</h3>
                {isOwner && availableUsers.length > 0 && (
                    <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                                <UserPlus className="h-4 w-4 mr-1"/>
                                Add Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Member</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div>
                                    <Label>Select User</Label>
                                    <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a user..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableUsers.map(user => (
                                                <SelectItem key={user.id} value={user.id}>
                                                    {user.name} ({user.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleAddMember} className="w-full" disabled={!selectedUserId}>
                                    Add Member
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="space-y-2">
                {owner && (
                    <div className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{getInitials(owner.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-900">{owner.name}</span>
                                    <Badge variant="default" className="h-5">
                                        <Crown className="h-3 w-3 mr-1"/>
                                        Owner
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{owner.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-2 bg-white rounded">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm text-gray-900">{member.name}</p>
                                <p className="text-xs text-gray-600">{member.email}</p>
                            </div>
                        </div>
                        {isOwner ? (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                        <Trash2 className="h-4 w-4 text-red-600"/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Remove Member</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to remove {member.name} from this list?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleRemoveMember(member.id)}>
                                            Remove
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : member.id === currentUser.id ? (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                        <LogOut className="h-4 w-4"/>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Leave Shopping List</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to leave this shopping list?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleLeavelist}>
                                            Leave
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
