import { Injectable } from '@angular/core';
import { Filter, FilterTypes, ConstA } from '../../types/filter';
import { MascaraType } from '../../types/maks';
import { PgmFile } from '../../types/pgm-image';
import { FilterInfo } from '../../utils/filter.decorator';

@FilterInfo({
    name: 'Logaritmo ',
    type: FilterTypes.Logaritmo,
})
@Injectable({ providedIn: 'root' })
export class LogaritmoFilter implements Filter {
    transform(
        image: PgmFile, 
        type: MascaraType, 
        options: ConstA = { a: 127 } ): number[] {
        const newImage = [];

        // const sortedPixels = Array.from(image.pixels).sort();
        // const max = sortedPixels.pop();
        // const a = 255 / (Math.log10(1 + max));

        const a = 50;

        for (let pixel of image.pixels) {
            newImage.push(a * Math.log10(pixel + 1));
        }

        return newImage;
    }
}
