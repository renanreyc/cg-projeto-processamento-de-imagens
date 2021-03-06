import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageHelperService {
    /**
     *
     * @param index index atual
     * @param columns total de colunas
     * @param rows total de linhas
     * @returns [x, y] coordenadas
     */
    public calculateCoordinates(
        index: number,
        columns: number,
        rows: number
    ): [number, number] {
        //para cada linha
        for (let i = 0; i < rows; i++) {
            //verifica se o parametro do index está na linha
            if (index < columns * i + columns && index >= columns * i) {
                //return x, y
                return [i, index - columns * i];
            }
        }

        return null;
    }

    public add(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] + imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public subtract(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] - imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public multiply(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] * imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public divide(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            const pixel = imageA[i] / imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public and(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            // Retorna um 1 para cada posição em que os bits da posição 
            // correspondente de ambos operandos sejam uns.
            const pixel = imageA[i] & imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);
    }

    public or(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            //Retorna um 0 para cada posição em que os bits da posição
            //correspondente de  ambos os operandos sejam zeros.
            const pixel = imageA[i] | imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);;
    }

    public xor(imageA: number[], imageB: number[]): number[] {
        const newImage = [];
        let minValue = 255;
        let maxValue = 0;

        const length =
            imageA.length < imageB.length ? imageA.length : imageB.length;

        for (let i = 0; i < length; i++) {
            // Retorna um 0 para cada posição em que os bits da posição 
            // correspondente são os mesmos.
            // [Retorna um 1 para cada posição em que os bits da posição
            // correspondente sejam diferentes.]
            const pixel = imageA[i] ^ imageB[i];
            minValue = Math.min(pixel, minValue);
            maxValue = Math.max(pixel, maxValue);
            newImage.push(pixel);
        }

        return this.normalization(newImage, maxValue, minValue, 255);;
    }

    //g(x,y) = ((f - fmin) / (fmax - fmin)) * 255
    public normalization(image: number[], maxPixelvalue: number, minPixelValue: number, maxCinzaValue: number): number[] {
        const newImage = [];

        for (let i = 0; i < image.length; i++) {
            const pixel = Math.round(((maxCinzaValue / (maxPixelvalue - minPixelValue)) * (image[i] - minPixelValue)));
            newImage.push(pixel);
        }

        return newImage;
    }
}
