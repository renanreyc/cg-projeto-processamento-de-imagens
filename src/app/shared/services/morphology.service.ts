import { Injectable } from '@angular/core';
import median from 'median';
import { PgmFile } from '../types/pgm-image';
import { MorphologyInfo, MorphologyTypes } from '../types/morphology';
import { Morph } from './morphology/morphy';

@Injectable({ providedIn: 'root' })
export class MorphologyService {
    elementStructuring = [1, 1]

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
        const newImage = [] 
        const imageBit = this.convertImageToBit(image);   
        let height = image.height;
        let width = image.width;

        const imageWithErosion = this.operation(imageBit, width, height, this.elementStructuring, 'erosion')
        console.log(imageWithErosion) 

        for (let i = 0; i < Number(image.height); i++) {
            for (let j = 0; j < Number(image.width); j++) {
                newImage.push(imageBit[i][j])
            }
        }

        for(let i = 0; i < newImage.length;i++){
            if(newImage[i] == 1){
                newImage[i] = 255;
            } else {
                newImage[i] = 0;
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = height;
        newPgm.width = width;
        return newPgm;
    }
    public scale(image: PgmFile): PgmFile {
      
        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = 10;
        newPgm.width = 10;

        return newPgm;
    }
    public translation(image: PgmFile): PgmFile {
        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;

        return newPgm;
    }
    public shear(image: PgmFile, deltaX: number, deltaY: number): PgmFile {
        const newImage = Array.from(Array(image.length).keys()).map(() => 255);

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.height = image.height;
        newPgm.width = image.width;

        return newPgm;
    }

    public convertImageToBit(image: PgmFile): number[] {
        const auxImage = [];
        const auxMatriz = [];
        const newImage = [];
        for (let i = 0; i < Number(image.height); i++) {
            auxMatriz[i] = []
            for (let j = 0; j < Number(image.width); j++) {
                auxMatriz[i][j] = image.matrizpixels[i][j]
            }
        }

        for(let i = 0; i < image.length;i++){
            auxImage.push(image.pixels[i]);
        }        
        
        let medianValue = median(auxImage);

        for (let i = 0; i < Number(image.height); i++) {
            newImage[i] = []
            for (let j = 0; j < Number(image.width); j++) {
                if(image.matrizpixels[i][j] >= medianValue){
                    newImage[i][j] = 1;
                } else {
                    newImage[i][j] = 0;
                }
            }
        }
        
        return newImage;        
    }

    private operation(image, width, height, structuringElement,operate = 'erosion') {
        let res = [];

        let target = operate === 'dilation' ? 1 : structuringElement.reduce((a, b) => a + b, 0);
    
        for (let i = 0; i < height; i++) {
            res [i] = []
            for (let j = 0; j < width; j++) {
                let acc = 0
    
                acc += structuringElement[0] & (i === 0 || j === 0 ? 0 : image[i - 1][j - 1]);
                acc += structuringElement[1] & (i === 0 ? 0 : image[i - 1][j]);
                acc += structuringElement[2] & (i === 0 || j === width - 1 ? 0 : image[i - 1][j + 1]);
    
                acc += structuringElement[3] & (j === 0 ? 0 : image[i][j - 1]);
                acc += structuringElement[4] & image[i][j];
                acc += structuringElement[5] & (j === width - 1 ? 0 : image[i][j + 1]);
    
                acc += structuringElement[6] & (i === height - 1 || j === 0 ? 0 : image[i + 1][j - 1]);
                acc += structuringElement[7] & (i === height - 1 ? 0 : image[i + 1][j]);
                acc += structuringElement[8] & (i === height - 1 || j === image.w - 1 ? 0 : image[i + 1][j + 1]);
    
                res[i][j] = acc >= target ? 1 : 0;
            }
        }
    
        return res;
    }
}
