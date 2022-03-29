import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Prewitt - X',
    type: FilterTypes.PrewittX,
})
@Injectable({ providedIn: 'root' })
export class PrewittXFilter extends BaseFilterService implements Filter {
    
    private mascara: Mascara = [
         -1,   -1,   -1,
         0,   0,   0,
         1,   1,   1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        return this.filterImage(image, this.mascara, type);
    }
}
