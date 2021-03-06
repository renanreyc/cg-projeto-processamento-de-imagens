import { Component, ViewChild } from '@angular/core';
import { ImageUpload, PgmFile } from '../../shared/types/pgm-image';
import { FilterTypes } from '../../shared/types/filter';
import { FilterTypeInfo } from '../../shared/utils/filter.decorator';
import { MascaraType } from '../../shared/types/maks';
import { FilterService } from '../../shared/services/filter.service';
import { AltoReforcoFilter } from '../../shared/services/filtros/alto-reforco.filter';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';
import { GamaFilter } from 'src/app/shared/services/filtros/gama.filter';
import { TransferenciaIntensidadeFilter } from 'src/app/shared/services/filtros/transferencia-intensidade.filter';
import { TransferenciaLinearFilter } from 'src/app/shared/services/filtros/transferencia-linear.filter';
import { MorphologyService } from 'src/app/shared/services/morphology.service';

@Component({
    selector: 'app-filtration',
    templateUrl: './filtration.component.html',
    styleUrls: ['./filtration.component.scss']
})
export class FiltrationComponent {
    @ViewChild(CanvasComponent)
    public canvas: CanvasComponent;

    @ViewChild('outPutCanvas')
    public outPutCanvas: CanvasComponent;
    public image: PgmFile;
    public filters: FilterTypeInfo[] = [];
    public selectedFilter: FilterTypes;
    public fator: number = 1.2;
    public gama: number = 0.5;
    public largura: number = 100;
    public linearA: number = 0.5;
    public linearB: number = 10;

    constructor(private readonly filterService: FilterService) {
        this.filters = filterService.getAllFilters();
    }

    public onFilterSelectChange(value: string): void {
        this.selectedFilter = Number(value);
        console.log(this.selectedFilter)
    }

    public onFilterClick() {
        if (this.image) {

            const filter = this.filterService.getFilter(this.selectedFilter);

            let filteredImage;
            if (this.selectedFilter === FilterTypes.AltoReforco) {
                filteredImage = (filter as AltoReforcoFilter).transform(
                    this.image,
                    MascaraType.convolution,
                    { fator: this.fator }
                );
            } else if (this.selectedFilter === FilterTypes.Gama) {
                filteredImage = (filter as GamaFilter).transform(
                    this.image,
                    MascaraType.convolution,
                    { y: this.gama }
                );
            } else if (this.selectedFilter === FilterTypes.TransferenciaIntensidade) {
                filteredImage = (filter as TransferenciaIntensidadeFilter).transform(
                    this.image,
                    MascaraType.convolution,
                    { largura: this.largura }
                );
            } else if (this.selectedFilter === FilterTypes.TransferenciaLinear) {
                console.log(this.linearA);
                console.log(this.linearB);
                
                filteredImage = (filter as TransferenciaLinearFilter).transform(
                    this.image,
                    MascaraType.convolution,
                    { a: this.linearA, b: this.linearB }
                );
            } else {
                filteredImage = filter.transform(
                    this.image,
                    MascaraType.convolution
                );
            }

            this.outPutCanvas.drawImage(
                this.image.width,
                this.image.height,
                filteredImage
            );
        }
    }

    public async onFileChange(values: ImageUpload) {
        const files = values.files;

        if (files && files.length > 0) {
            this.image = await PgmFile.load(files.shift());
            this.canvas.drawImage(
                this.image.width,
                this.image.height,
                this.image.pixels
            );
        }
    }
}
