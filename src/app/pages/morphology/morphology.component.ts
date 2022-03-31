import { Component, ViewChild } from '@angular/core';
import { ImageUpload, PgmFile } from '../../shared/types/pgm-image';
import { CanvasComponent } from '../../shared/components/canvas/canvas.component';
import { MorphologyService } from 'src/app/shared/services/morphology.service';
import { MorphologyInfo, MorphologyTypes } from 'src/app/shared/types/morphology';

@Component({
    selector: 'app-morphology',
    templateUrl: './morphology.component.html',
    styleUrls: ['./morphology.component.scss']
})
export class MorphologyComponent {
    @ViewChild(CanvasComponent)
    public canvas: CanvasComponent;

    @ViewChild('outPutCanvas')
    public outPutCanvas: CanvasComponent;

    public image: PgmFile;

    public transformations: MorphologyInfo[] = [];

    public transformedImage: PgmFile;

    public selectedTransformation: MorphologyTypes;


    constructor(private readonly morphologyService: MorphologyService) {
        this.transformations = morphologyService.getTransformations();
    }

    public onTransformationSelectChange(value: string): void {
        this.selectedTransformation = Number(value);
    }

    public onTransformationClick() {
        if (this.image) {

            if (this.selectedTransformation === MorphologyTypes.dilation) {
                this.transformedImage = this.morphologyService.dilation(
                    this.image

                );
            } else if (this.selectedTransformation === MorphologyTypes.erosion) {
                this.transformedImage = this.morphologyService.erosion(
                    this.image

                )
            } else if (this.selectedTransformation === MorphologyTypes.closure) {
                this.transformedImage = this.morphologyService.closure(
                    this.image

                )
            } else if (this.selectedTransformation === MorphologyTypes.opening) {
                this.transformedImage = this.morphologyService.opening(
                    this.image
                )
            }


            this.outPutCanvas.drawImage(
                this.transformedImage.width,
                this.transformedImage.height,
                this.transformedImage.pixels
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
