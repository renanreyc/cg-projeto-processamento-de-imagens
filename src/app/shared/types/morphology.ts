export enum MorphologyTypes {
    dilation, 
    erosion,
    closure,
    opening
}

export interface MorphologyInfo {
    name: string;
    type: MorphologyTypes;
}
