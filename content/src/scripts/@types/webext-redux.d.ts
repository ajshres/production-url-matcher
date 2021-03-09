declare module 'webext-redux' {
    export default function (...paths: any[]): any;
    export class Store {
        constructor(...arg: any[]);
    }

    export let alias: any;
    export let wrapStore: any;
}