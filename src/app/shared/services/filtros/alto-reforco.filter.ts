import { Injectable } from '@angular/core';
import { AltoReforcoOptions, Filter, FilterTypes } from '../../types/filter';
import { Mascara, MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { BaseFilterService } from '../base-filter.service';
import { ImageHelperService } from '../image-helper.service';
import { PassaAltoBordaFilter } from './passa-alto-bordas.filter';
import { PassaBaixoMediaFilter } from './passa-baixo-media.filter';

@FilterInfo({
    name: 'Alto Reforço',
    type: FilterTypes.AltoReforco,
})
@Injectable({ providedIn: 'root' })
export class AltoReforcoFilter
    extends BaseFilterService
    implements Filter<AltoReforcoOptions> {

    // prettier-ignore
    private mascara: Mascara = [
        -1/9, -1/9, -1/9,
        -1/9,    9, -1/9,
        -1/9, -1/9, -1/9
    ];

    constructor(imageHelperService: ImageHelperService) {
        super(imageHelperService);
    }

    public transform(
        image: PgmFile,
        type: MascaraType,
        options: AltoReforcoOptions = { fator: 1.2 }
    ): number[] {

        const mascara = Array.from(this.mascara) as Mascara;
        mascara[4] = ((mascara[4] * options.fator) - 1) / 9;

        return this.filterImage(image, mascara, type)
    }
}
