/**
 - Representa um armazenamento de arquivo de imagem no formato PGM
 - O PGM é dividido em duas seções: o cabeçalho e o corpo
 - Onde as três primeiras linhas compõem o cabeçalho (1º ID, 2º Largura e Altura e 3º Maior Nível de Cinza)
 * O resto do arquivo representa o corpo onde cada elemento representa um pixel
 */


export type FilesEvent = { [key: number]: File };
export interface ImageUpload {
    files: File[];
    type: string;
}
export class PgmFile {
    public id: string;

    public width: number;

    public height: number;

    public maxGreyValue: number;

    public pixels: number[] = [];

    public matrizpixels: number[][] = [];

    get length(): number {
        return this.pixels.length;
    }

    public static async load(file: File): Promise<PgmFile> {
        return this.readFile(file);
    }

    public pixelAt(x: number, y: number): number {
        const index = this.calculateArrayIndex(x, y);
        return index < 0 ? 0 : this.pixels[index];
    }

    public calculateArrayIndex(x: number, y: number): number {
        return x * this.width + y;
    }

    private static async readFile(file: File): Promise<PgmFile> {

        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', (content) => {
                try {
                    const result = content.target.result as string;
                    resolve(this.processContent(result));
                } catch (error) {
                    reject(error);
                }
            });

            fileReader.readAsText(file);
        });
    }

    private static processContent(content: string): PgmFile {
        // console.log("content")
        // console.log(content)
        const file = new PgmFile();

        // CABEÇALHO
        const lines = content.split('\n');

        file.id = lines.shift();

        const [width, height] = lines.shift().split(' ');
        file.width = Number(width);
        file.height = Number(height);

        file.maxGreyValue = Number(lines.shift());

        // Remove o último elemento porque sempre é blank '\n'
        lines.pop();

        /* CONTENT BODY */
        for (let line of lines) {
            const pixels = line.split(' ').map((pixel) => {
                const a = Number(pixel);
                return a;
            });
            file.pixels.push(...pixels);

        }

        let flat = 0
        for (let i = 0; i < Number(height); i++) {
            file.matrizpixels[i] = [];
            for (let j = 0; j < Number(width); j++) {
                file.matrizpixels[i][j] = file.pixels[flat++]
            }
        }

        return file;
    }
}
