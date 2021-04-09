export interface Storage {
    key: string;
    value: any;
    way: "session" | "location";
}

export interface Window {
    url: string;
    flag: boolean;
}


