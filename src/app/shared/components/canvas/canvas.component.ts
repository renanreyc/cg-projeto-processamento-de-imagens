import {
    Component,
    Input,
    OnInit,
    ViewChild,
    AfterViewInit,
    ElementRef,
    Output,
    EventEmitter,
} from '@angular/core';
import { PgmFile } from '../../types/pgm-image';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit {
    @Input()
    public width = 256;

    @Input()
    public height = 256;

    @ViewChild('canvas')
    public canvasRef: ElementRef;

    private canvas: HTMLCanvasElement;

    private canvasContext: CanvasRenderingContext2D;

    constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.canvasContext = this.canvas.getContext('2d');
    }

    public clean(): void {
        this.canvasContext.clearRect(0, 0, this.width, this.height);
    }

    public drawImage(width: number, height: number, pixels: number[]): void {
        const imageData = this.canvasContext.createImageData(width, height);
        const data = imageData.data;

        let pixelCount = 0;
        for (let pixel of pixels) {
            // VERMELHO
            data[0 + pixelCount] = pixel;
            // VERDE
            data[1 + pixelCount] = pixel;
            // AZUL
            data[2 + pixelCount] = pixel;
            // ALFA
            data[3 + pixelCount] = 255;

            pixelCount += 4;
        }

        // Desenha o proximo tick, após o redesenho dos componentes

        setTimeout(() => {
            // Desenha uma imagem na janela na posição [0, 0]
            this.canvasContext.putImageData(imageData, 0, 0);
        }, 0);
    }
}
