import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilter } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Operador Roberts - Cruzado - X',
    type: FilterTypes.RobertsCruzadoX,
})
@Injectable({ providedIn: 'root' })
export class RobertsCruzadoXFilter extends BaseFilter implements Filter {

    private mascara: Mascara = [
        0, 0,  0,
        0, 1,  0,
        0, 0, -1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        return this.filterImage(image, this.mascara, type);
    }
}
