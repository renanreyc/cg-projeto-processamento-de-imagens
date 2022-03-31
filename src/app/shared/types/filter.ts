import { MascaraType } from './maks';
import { PgmFile } from './pgm-image';

export interface Filter<T = {}> {
    transform(image: PgmFile, type: MascaraType, options?: T): number[];
}

export enum FilterTypes {
    PassaAltoBordas,
    PassaAltoAgucamento,

    PassaBaixoMedia,
    PassaBaixoMediana,

    RobertsX,
    RobertsY,
    RobertsMag,
    RobertsCruzadoX,
    RobertsCruzadoY,
    RobertsCruzadoMag,

    PrewittX,
    PrewittY,
    PrewittMag,

    SobelX,
    SobelY,
    SobelMag,

    AltoReforco,
    Negativo,
    Gama,
    Logaritmo,
    TransferenciaIntensidade,
    TrasnferenciaFaixaDinamica,
    TransferenciaLinear
}

export type AltoReforcoOptions = { fator: number };
export type GamaOptions = { y: number };
export type ConstA = { a: number};
export type Largura = { largura: number};

export type LogaritmoOptions = { a: number };
