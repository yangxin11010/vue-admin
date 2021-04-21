export interface Tabs {
    name: string;
    title: string;
    path: string;
    keepAlive: boolean,
}

export interface DashboardCard {
    icon: string;
    iconColor: string;
    title: string;
    num: string;
}

export interface ToDoItem {
    things: string;
    isFinish: boolean;
    isDel: boolean;
}

export interface Menu {
    menuId?: number;
    title: string;
    path: string;
    icon: string;
    parentMenuId: number | null;
    keepAlive: boolean;
    status: number;
    children: Menu[];
}
