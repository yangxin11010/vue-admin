/**
 * 装饰器
 */
export const Test = () => {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
    }
}





















