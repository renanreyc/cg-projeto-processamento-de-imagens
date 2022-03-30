import { Injectable } from '@angular/core';
import { PgmFile } from '../types/pgm-image';
import { MorphologyInfo, MorphologyTypes } from '../types/morphology';

@Injectable({ providedIn: 'root' })
export class MorphologyService {
    private readonly transformations: MorphologyInfo[] = [
        {
            name: 'Dilatação',
            type: MorphologyTypes.dilation,
        },
        {
            name: 'Erosão',
            type: MorphologyTypes.erosion,
        },
        {
            name: 'Fechamento',
            type: MorphologyTypes.closure,
        },
        {
            name: 'Abertura',
            type: MorphologyTypes.opening,
        },
    ];

    
    public getTransformations(): MorphologyInfo[] {
        return this.transformations;
    }

    public dilation(image: PgmFile): PgmFile {
        let deg = 360;


        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

       

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;
        return newPgm;
    }

    public scale(image: PgmFile, deltaX, deltaY): PgmFile {
        let newWidth = Math.round(deltaX * image.width);
        let newHeight = Math.round(deltaY * image.height);

        if (newWidth <= 0) {
            newWidth = 1;
        }
        if (newHeight <= 0) {
            newHeight = 1;
        }

        if (newWidth === image.width && newHeight === image.height) {
            return image;
        }

        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const wRatio = image.width / newWidth;
        const hRatio = image.height / newHeight;

        for (let i = 0; i < newWidth; i++) {
            const w = Math.floor((i + 0.5) * wRatio);
            for (let j = 0; j < newHeight; j++) {
                const h = Math.floor((j + 0.5) * hRatio);
                if (image.pixelAt(w, h)) {
                    const index = i * newWidth + j;
                    newImage[index] = image.pixelAt(w, h);
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = newHeight;
        newPgm.width = newWidth;

        return newPgm;
    }

    public translation(
        image: PgmFile,
        deltaX: number,
        deltaY: number
    ): PgmFile {
        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        for (let i = 0; i < image.height; i++) {
            for (let j = 0; j < image.width; j++) {
                const x = i + (deltaX - 1);
                const y = j + (deltaY - 1);
                const index = image.calculateArrayIndex(x, y);

                if (
                    index <= image.length &&
                    x < image.height &&
                    y < image.width
                ) {
                    newImage[index] = image.pixelAt(i, j);
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;

        return newPgm;
    }

    public shear(image: PgmFile, deltaX: number, deltaY: number): PgmFile {
        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const xOffset = Math.round((image.width * deltaX) / 2.0);
        const yOffset = Math.round((image.height * deltaY) / 2.0);

        for (let i = 0; i < image.height; i++) {
            for (let j = 0; j < image.width; j++) {

                let x = Math.round(i + deltaX * j);
                x -= xOffset;

                let y = Math.round(j + deltaY * x);
                y -= yOffset;

                const index = image.calculateArrayIndex(x, y);
                if (index < image.length && x < image.height && y < image.width) {
                    newImage[index] = image.pixelAt(i, j);
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;

        return newPgm;
    }

    private createTranslationFunction(
        deltaX: number,
        deltaY: number
    ): (x: number, y: number) => { x: number; y: number } {
        return (x, y) => ({
            x: x + deltaX,
            y: y + deltaY,
        });
    }
}
