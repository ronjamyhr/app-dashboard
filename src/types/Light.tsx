export interface ILights {
    [key: string]: IStateLight
}

interface IStateLight {
    state: any;
    name: string;
}
