import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Prewitt - Magnitude',
    type: FilterTypes.PrewittMag,
})
@Injectable({ providedIn: 'root' })
export class PrewittMagFilter extends BaseFilterService implements Filter {

    private mascaraX: Mascara = [
         1,   1,   1,
         0,   0,   0,
        -1,  -1,  -1
    ];

    private mascaraY: Mascara = [
         1,   0,  -1,
         1,   0,  -1,
         1,   0,  -1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        const filterX = this.filterImage(image, this.mascaraX, type, true);
        const filterY = this.filterImage(image, this.mascaraY, type, true);

        const imageMag = [];

        for (let i = 0; i < image.length; i++) {
            imageMag.push(Math.abs(filterX[i]) + Math.abs(filterY[i]));
        }

        return imageMag;
    }
}
