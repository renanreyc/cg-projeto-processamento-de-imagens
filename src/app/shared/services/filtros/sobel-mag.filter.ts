import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilter } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Sobel - Magnitude',
    type: FilterTypes.SobelMag,
})
@Injectable({ providedIn: 'root' })
export class SobelMagFilter extends BaseFilter implements Filter {

    private mascaraX: Mascara = [
        -1,  -2,  -1,
         0,   0,   0,
         1,   2,   1
    ];


    private mascaraY: Mascara = [
       -1,   0,   1,
       -2,   0,   2,
       -1,   0,   1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        const filterX = this.filterImage(image, this.mascaraX, type);
        const filterY = this.filterImage(image, this.mascaraY, type);

        const imageMag = [];

        for (let i = 0; i < image.length; i++) {
            imageMag.push(Math.abs(filterX[i]) + Math.abs(filterY[i]));
        }

        return imageMag;
    }
}
