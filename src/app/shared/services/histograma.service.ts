import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HistogramaService {

    // Calcula o Histograma da Imagem:
    public calculateHistograma(
        imagem: number[],
        length: number,
        maxGreyValue = 256
    ): number[] {
        const histogram = this.initializeHistogramArray(maxGreyValue);

        for (let pixel of imagem) {
            histogram[pixel] += 1;
        }

        // P(rk) = nk / n -> qtd de número de cinza k dividido pelo total
        return histogram.map((pixelCount) => pixelCount / length);
    }

    // distribuir uniformemente os niveis de cinza da imagem
    public equalizeHistogram(
        histogram: number[],
        maxGrey: number = 256
    ): number[] {
        const equalized = [];

        // retorna o acúmulado de cada pixel no array equalized 
        histogram.reduce((acc, next) => {
            const sum = acc + next;
            equalized.push(sum);
            return sum;
        }, 0);

        // novo mapeamento dos mixels mapeados
        const pixelsMap = this.initializeHistogramArray();

        for (let i = 0; i < equalized.length; i++) {
            for (let j = 0; j < maxGrey; j++) {
                const track = j / maxGrey;
                
                //console.log(track)

                if (equalized[i] === track) {
                    pixelsMap[i] = j;
                    break;
                } else if (equalized[i] < track) {
                    const diff = Math.abs(equalized[i] - track);
                    const diffPrevious = Math.abs(
                        equalized[i] - (j - 1) / maxGrey
                    );
                    pixelsMap[i] = diff < diffPrevious ? j : j - 1;
                    break;
                } else {
                    pixelsMap[i] = j;
                }
            }
        }

        return pixelsMap;
    }

    //array para variação da faixa do histograma
    private initializeHistogramArray(maxGrey: number = 256): number[] {
        const histogram = [];

        for (let i = 0; i < maxGrey; i++) {
            histogram.push(0);
        } // [0,0,0,...,0,0,0] de 0 até Máximo valor de cinza da imagem
        //console.log(histogram)

        return histogram;
    }
}
