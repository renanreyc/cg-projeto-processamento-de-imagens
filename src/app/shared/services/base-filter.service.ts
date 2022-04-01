import { Mascara, MascaraType } from '../types/maks';
import { PgmFile } from '../types/pgm-image';
import { ImageHelperService } from './image-helper.service';

export class BaseFilter {
    constructor(protected readonly imageHelperService: ImageHelperService) {}

    protected filterImage(
        image: PgmFile,
        mascara: Mascara,
        type: MascaraType = MascaraType.correlation,
        abs = false
    ): number[] {
        const newImage = [];

        if (type == MascaraType.convolution) {
            console.log("Convoluindo sim!")
            mascara = this.convolutionMascara(mascara);
        }
            
        for (let i = 0; i < image.length; i++) {
            const vizinhanca = this.getVizinhos(i, image);
            let sum = 0;

            for (let j = 0; j < 9; j++) {
                sum += Math.floor(vizinhanca[j] * mascara[j]);
                if (abs) sum = Math.abs(sum);
            }

            newImage.push(sum);
        }

        return newImage;
    }

    protected getVizinhos(i: number, image: PgmFile, zeroCount = true, addCenter = true): Mascara {

        // Para encontrarmos o vizinho superior ou inferior ao pixel
        // pegamos a posição do pixel array menos a largura da imagem 
        // e pegamos o resto de i com a largura da imagem para saber se
        // ela está no inicio ou no fim da linha
        const vizinhos = [];

        // Noroeste
        if (i - image.width - 1 >= 0 && i % image.width != 0)
            vizinhos.push(image.pixels[i - image.width - 1]);
        else if (zeroCount) vizinhos.push(0);

        // Norte
        if (i - image.width >= 0) 
            vizinhos.push(image.pixels[i - image.width]);
        else if (zeroCount) vizinhos.push(0);

        // Nordeste
        if (i - image.width + 1 >= 0 && (i + 1) % image.width != 0)
            vizinhos.push(image.pixels[i - image.width + 1]);
        else if (zeroCount) vizinhos.push(0);

        //Oeste
        if (i % image.width != 0) 
            vizinhos.push(image.pixels[i - 1]);
        else if (zeroCount) vizinhos.push(0);

        //Centro
        if (addCenter)
            vizinhos.push(image.pixels[i]);

        //Leste
        if ((i + 1) % image.width != 0) 
            vizinhos.push(image.pixels[i + 1]);
        else if (zeroCount) vizinhos.push(0);

        // Sudoeste
        if (i + image.width - 1 < image.length && i % image.width != 0)
            vizinhos.push(image.pixels[i + image.width - 1]);
        else if (zeroCount) vizinhos.push(0);

        // Sul
        if (i + image.width < image.length) 
            vizinhos.push(image.pixels[i + image.width]);
        else if (zeroCount) vizinhos.push(0);

        //Sudeste
        if (i + image.width + 1 < image.length && (i + 1) % image.width != 0)
            vizinhos.push(image.pixels[i + image.width + 1]);
        else if (zeroCount) vizinhos.push(0);

        return vizinhos as Mascara;
    }

    protected convolutionMascara(mascara: Mascara): Mascara {

        const convolution: Mascara = [
            mascara[0], mascara[1], mascara[2],
            mascara[3], mascara[4], mascara[5],
            mascara[6], mascara[7], mascara[8],
        ];

        return convolution;
    }
}
