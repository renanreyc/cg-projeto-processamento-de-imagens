import { Injectable } from '@angular/core';
import median from 'median';
import { PgmFile } from '../types/pgm-image';
import { MorphologyInfo, MorphologyTypes } from '../types/morphology';


@Injectable({ providedIn: 'root' })
export class MorphologyService {
    elementStructuring = [0, 1, 0, 1, 1, 1, 0, 1, 0]

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
        const newMatriz = []
        const imageBit = this.convertImageToBit(image);   
        let height = image.height;
        let width = image.width;

        const imageWithDilatation = this.operation(imageBit, width, height, this.elementStructuring, 'dilation')

        for (let i = 0; i < Number(image.height); i++) {
            newMatriz[i] = []
            for (let j = 0; j < Number(image.width); j++) {
                if(imageWithDilatation[i][j] == 1){
                    newMatriz[i][j] = 255
                    newImage.push(255)
                }else {
                    newMatriz[i][j] = 0
                    newImage.push(0)
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.matrizpixels = newMatriz;
        newPgm.height = height;
        newPgm.width = width;
        
        return newPgm;
    }
    public erosion(image: PgmFile): PgmFile {
        const newImage = [] 
        const newMatriz = []
        const imageBit = this.convertImageToBit(image);   
        let height = image.height;
        let width = image.width;

        const imageWithDilatation = this.operation(imageBit, width, height, this.elementStructuring, 'erosion')

        for (let i = 0; i < Number(image.height); i++) {
            newMatriz[i] = []
            for (let j = 0; j < Number(image.width); j++) {
                if(imageWithDilatation[i][j] == 1){
                    newMatriz[i][j] = 255
                    newImage.push(255)
                }else {
                    newMatriz[i][j] = 0
                    newImage.push(0)
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.matrizpixels = newMatriz;
        newPgm.height = height;
        newPgm.width = width;        

        return newPgm;
    }

    public opening(image: PgmFile): PgmFile {
        const newImage = [] 
        const newMatriz = [] 
        let height = image.height;
        let width = image.width;

        const imageWithOpening = this.operation(
            this.erosion(image).matrizpixels, 
            width, 
            height, 
            this.elementStructuring, 
            'dilatation')
        console.log(imageWithOpening) 

        for (let i = 0; i < Number(image.height); i++) {
            newMatriz[i] = []
            for (let j = 0; j < Number(image.width); j++) {
                if(imageWithOpening[i][j] == 1){
                    newMatriz[i][j] = 255
                    newImage.push(255)
                }else {
                    newMatriz[i][j] = 0
                    newImage.push(0)
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.matrizpixels = newMatriz;
        newPgm.height = height;
        newPgm.width = width;        

        return newPgm;
    }

    public closure(image: PgmFile): PgmFile {
        const newImage = [] 
        const newMatriz = [] 
        let height = image.height;
        let width = image.width;

        const imageWithOpening = this.operation(
            this.dilation(image).matrizpixels, 
            width, 
            height, 
            this.elementStructuring, 
            'erosion')
        console.log(imageWithOpening) 

        for (let i = 0; i < Number(image.height); i++) {
            newMatriz[i] = []
            for (let j = 0; j < Number(image.width); j++) {
                if(imageWithOpening[i][j] == 1){
                    newMatriz[i][j] = 255
                    newImage.push(255)
                }else {
                    newMatriz[i][j] = 0
                    newImage.push(0)
                }
            }
        }

        const newPgm = new PgmFile();
        newPgm.pixels = newImage;
        newPgm.matrizpixels = newMatriz;
        newPgm.height = height;
        newPgm.width = width;        

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
                    newImage[i][j] = 0;
                } else {
                    newImage[i][j] = 1;
                }
            }
        }
        
        return newImage;        
    }

    private operation(image, width, height, structuringElement, operate = 'erosion') {
        let res = [];    

        let target = operate === 'erosion' ? 1 : structuringElement.reduce((a, b) => a + b, 0);
        
        
        for (let i = 0; i < height; i++) {
            res [i] = []
            for (let j = 0; j < width; j++) {
                let acc = 0
    
                //PRIMEIRA LINHA
                acc += structuringElement[0] & (i === 0 || j === 0 ? 0 : image[i - 1][j - 1]);
                acc += structuringElement[1] & (i === 0 ? 0 : image[i - 1][j]);
                acc += structuringElement[2] & (i === 0 || j === width - 1 ? 0 : image[i - 1][j + 1]);
    
                //SEGUNDA LINHA
                acc += structuringElement[3] & (j === 0 ? 0 : image[i][j - 1]);
                acc += structuringElement[4] & image[i][j];
                acc += structuringElement[5] & (j === width - 1 ? 0 : image[i][j + 1]);
    
                //TERCEIRA LINHA
                acc += structuringElement[6] & (i === height - 1 || j === 0 ? 0 : image[i + 1][j - 1]);
                acc += structuringElement[7] & (i === height - 1 ? 0 : image[i + 1][j]);
                acc += structuringElement[8] & (i === height - 1 || j === image.w - 1 ? 0 : image[i + 1][j + 1]);
    
                res[i][j] = acc >= target ? 1 : 0;
            }
        }
    
        return res;
    }
}
