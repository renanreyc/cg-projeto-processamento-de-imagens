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

    // public structure: number = 90;

    public x: number = 0;

    public y: number = 0;

    public gama: number = 0.5;

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
                    // ,this.structure
                );
            } else if (this.selectedTransformation === MorphologyTypes.erosion) {
                this.transformedImage = this.morphologyService.scale(
                    this.image

                )
            } else if (this.selectedTransformation === MorphologyTypes.closure) {
                this.transformedImage = this.morphologyService.shear(
                    this.image,
                    this.x,
                    this.y
                )
            } else if (this.selectedTransformation === MorphologyTypes.opening) {
                this.transformedImage = this.morphologyService.translation(
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
