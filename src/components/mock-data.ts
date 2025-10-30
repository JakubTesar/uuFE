export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ShoppingListItemModel {
  id: string;
  text: string;
  resolved: boolean;
  addedBy: string;
}

export interface ShoppingListModel {
  id: string;
  name: string;
  ownerId: string;
  memberIds: string[];
  items: ShoppingListItemModel[];
  archived: boolean;
}

export const mockUsers: User[] = [
  { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
  { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'user-3', name: 'Bob Wilson', email: 'bob@example.com' },
  { id: 'user-4', name: 'Alice Brown', email: 'alice@example.com' },
  { id: 'user-5', name: 'Charlie Davis', email: 'charlie@example.com' },
];

export const mockLists: ShoppingListModel[] = [
  {
    id: 'list-1',
    name: 'Weekly Groceries',
    ownerId: 'user-1',
    memberIds: ['user-2', 'user-3'],
    archived: false,
    items: [
      { id: 'item-1', text: 'Milk', resolved: true, addedBy: 'user-1' },
      { id: 'item-2', text: 'Bread', resolved: false, addedBy: 'user-1' },
      { id: 'item-3', text: 'Eggs', resolved: false, addedBy: 'user-2' },
      { id: 'item-4', text: 'Butter', resolved: true, addedBy: 'user-1' },
      { id: 'item-5', text: 'Cheese', resolved: false, addedBy: 'user-3' },
    ],
  },
  {
    id: 'list-2',
    name: 'Party Supplies',
    ownerId: 'user-2',
    memberIds: ['user-1'],
    archived: false,
    items: [
      { id: 'item-6', text: 'Paper plates', resolved: false, addedBy: 'user-2' },
      { id: 'item-7', text: 'Cups', resolved: false, addedBy: 'user-2' },
      { id: 'item-8', text: 'Napkins', resolved: true, addedBy: 'user-1' },
    ],
  },
  {
    id: 'list-3',
    name: 'Home Supplies',
    ownerId: 'user-1',
    memberIds: ['user-2'],
    archived: false,
    items: [
      { id: 'item-9', text: 'Toilet paper', resolved: false, addedBy: 'user-1' },
      { id: 'item-10', text: 'Soap', resolved: false, addedBy: 'user-2' },
    ],
  },
  {
    id: 'list-4',
    name: 'Summer BBQ 2024',
    ownerId: 'user-1',
    memberIds: ['user-2', 'user-3', 'user-4'],
    archived: true,
    items: [
      { id: 'item-11', text: 'Burgers', resolved: true, addedBy: 'user-1' },
      { id: 'item-12', text: 'Hot dogs', resolved: true, addedBy: 'user-2' },
      { id: 'item-13', text: 'Buns', resolved: true, addedBy: 'user-3' },
    ],
  },
];
