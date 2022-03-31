export enum MorphologyTypes {
    dilation, 
    erosion,
    opening,
    closure,
    
}

export interface MorphologyInfo {
    name: string;
    type: MorphologyTypes;
}
