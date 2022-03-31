import { Injectable } from '@angular/core';
import { Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilter } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Passa Alto - Aguçamento',
    type: FilterTypes.PassaAltoAgucamento,
})
@Injectable({ providedIn: 'root' })
export class PassaAltoAgucamentoFilter
    extends BaseFilter
    implements Filter {

    private mascara: Mascara = [
        -1, -1, -1,
        -1,  8, -1,
        -1, -1, -1
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(image: PgmFile, type: MascaraType): number[] {
        return this.filterImage(image, this.mascara, type);
    }
}
