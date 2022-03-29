import { Injectable } from '@angular/core';
import median from 'median';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Passa Baixo - Mediana',
    type: FilterTypes.PassaBaixoMediana,
})
@Injectable({ providedIn: 'root' })
export class PassaBaixoMedianaFilter extends BaseFilterService implements Filter {
    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        const newImage = [];

        for (let i = 0; i < image.length; i++) {
            const vizinhanca = this.getVizinhos(i, image);
            newImage.push(median(vizinhanca));
        }

        return newImage;
    }
}
