import ColorGenerator from "./ColorGenerator";


//TODO пофиксить баг с цветами
export default class ColorPool {
    private freeColors: string[] = [];
    private colorsSet: Set<string> = new Set();
    private pool: Map<number, string> = new Map();
    private colorGenerator: ColorGenerator = new ColorGenerator();

    public static instance = new ColorPool();

    private constructor() { }

    init() {
        this.freeColors = Array.from(this.colorsSet);
        this.pool.clear();
    }

    getColor(id: number): string {
        const stringId = id.toString();
        const stringUniqueHash = [...stringId.split('')].reduce((acc, char) => {
            return char.charCodeAt(0)*99 + ((acc << 5) - acc);
        }, 0);
        return `hsl(${stringUniqueHash % 360}, ${stringUniqueHash % 20 + 60}%, ${stringUniqueHash % 30 + 50}%)`;
    }
}