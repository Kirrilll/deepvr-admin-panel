import ColorGenerator from "./ColorGenerator";


//TODO пофиксить баг с цветами
export default class ColorPool {
    private colors = new Set<string>( ['#F9D450', '#F091AA', '#ABAFE5', '#B4E14E', '#55C1E7', '#DD4D35', '#F3A575', '#5092F7', '#75FADC', '#952EF1', '#30A5D1']);
    private freeColors: string[] = [];
    private colorsSet: Set<string> = new Set();
    private pool: Map<number, string> = new Map();
    private colorGenerator: ColorGenerator = new ColorGenerator();

    public static instance = new ColorPool();

    private constructor() {}

    init(){
        this.freeColors = Array.from(this.colorsSet);
        this.pool.clear();
    }

    private generateUniqueColor(): string{
        const color = this.colorGenerator.generateHslColor({minLLimit: 50, maxLLimit: 80});
        if(this.colorsSet.has(color)){
            return this.generateUniqueColor();
        }
        return color;
    }
    
    getColor(id: number):string{
        if(!this.pool.has(id)){
            let color = this.freeColors.shift();
            if(color === undefined){
                color = this.generateUniqueColor();
                this.colorsSet.add(color);

            }
            this.pool.set(id, color ?? '');
        }
        return this.pool.get(id)!;
    }
}