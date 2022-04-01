import { Injectable } from '@angular/core';
import { Filter, FilterTypes, TransferenciaLinearOptions} from '../../types/filter';
import { MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';
import { ImageHelperService } from '../image-helper.service';

@FilterInfo({
    name: 'Transferência Linear',
    type: FilterTypes.TransferenciaLinear
})
@Injectable({ providedIn: 'root' })
export class TransferenciaLinearFilter implements Filter<TransferenciaLinearOptions> {

    constructor(private readonly imageHelperService: ImageHelperService) {}

    transform(
        image: PgmFile, 
        type: MascaraType, 
        options: TransferenciaLinearOptions = { a: 1, b: 10}
    ): number[] {
        const newImage = [];

        let minValue = 0;
        let maxValue = 255;

        for (let pixel of image.pixels) {

            const eqLinear = (options.a * pixel) + options.b; //eq. linear: y = a*x + b

            minValue = Math.min(eqLinear, minValue);
            maxValue = Math.max(eqLinear, maxValue);

            newImage.push(eqLinear);
        }

        return this.imageHelperService.normalization(
            newImage,
            maxValue,
            minValue,
            image.maxGreyValue
        );;
    }
}
