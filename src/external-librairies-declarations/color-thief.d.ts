declare module 'colorthief' {
  export default class ColorThief {
    constructor();

    getColor(sourceImage: HTMLImageElement | HTMLCanvasElement, quality?: number): number[];
    getPalette(sourceImage: HTMLImageElement | HTMLCanvasElement, colorCount?: number, quality?: number): number[][];
    getColorFromUrl(imageUrl: string, callback: (color: number[], imageUrl: string) => void, quality?: number): void;
    getImageData(imageUrl: string, callback: (imageData: string) => void): void;
    getColorAsync(imageUrl: string, callback: (color: number[], image: HTMLImageElement) => void, quality?: number): void;
  }
}
