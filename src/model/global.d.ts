declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.scss" {
    const value: any;
    export default value;
}

declare module "*.css" {
    const value: any;
    export default value;
}

declare module "*.sass" {
    const value: any;
    export default value;
}

declare interface CustomData {
    [key: string]: any;
}

declare interface Window {
    [key: string]: any;
}
