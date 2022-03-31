import { Injectable } from '@angular/core';
import median from 'median';
import { Filter, FilterTypes, Largura } from '../../types/filter';
import { MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Transferência de Intensidade',
    type: FilterTypes.TransferenciaIntensidade
})
@Injectable({ providedIn: 'root' })
export class TransferenciaIntensidadeFilter implements Filter<Largura> {

    constructor(private readonly imageHelperService: ImageHelperService) {}

    transform(
        image: PgmFile, 
        type: MascaraType, 
        options: Largura = { largura: 1}
    ): number[] {
        const newImage = [];
        const centerPixel = median(Array.from(image.pixels));

        let minValue = 0;
        let maxValue = 255;

        for (let pixel of image.pixels) {

            const calculoPotencia = (pixel - centerPixel) / options.largura; //r: pixel. w: centro dos valores de cinza, o: largura da janela
            const result = Math.round(255 * (1 / 1 + Math.exp(-calculoPotencia)));

            minValue = Math.min(result, minValue);
            maxValue = Math.max(result, maxValue);

            newImage.push(result);
        }

        return this.imageHelperService.normalization(
            newImage,
            maxValue,
            minValue,
            image.maxGreyValue
        );;
    }
}
