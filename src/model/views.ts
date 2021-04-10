export interface Tabs {
    name: string;
    title: string;
    path: string;
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
