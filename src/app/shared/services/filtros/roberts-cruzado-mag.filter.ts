import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilter } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Operador Roberts - Cruzado - Magnitude',
    type: FilterTypes.RobertsCruzadoMag,
})
@Injectable({ providedIn: 'root' })
export class RobertsCruzadoMagFilter extends BaseFilter implements Filter {

    private mascaraX: Mascara = [
        0,  0,  0,
        0,  1,  0,
        0,  0, -1
    ];

    private mascaraY: Mascara = [
         0,  0, 0,
         0,  0, 1,
         0, -1, 0
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        const filterX = this.filterImage(image, this.mascaraX, type, true);
        const filterY = this.filterImage(image, this.mascaraY, type, true);

        const imageMag = [];

        for (let i = 0; i < image.length; i++) {
            imageMag.push(filterX[i] + filterY[i]);
        }

        return imageMag;
    }
}
