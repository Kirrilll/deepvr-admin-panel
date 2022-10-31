

//TODO пофиксить баг с цветами
export default class ColorPool {
    private colors: string[] = ['#F9D450', '#F091AA', '#ABAFE5', '#B4E14E', '#55C1E7', '#DD4D35', '#F3A575', '#5092F7', '#75FADC', '#952EF1', '#30A5D1'];
    private freeColors: string[] = [];
    private pool: Map<number, string> = new Map();

    public static instance = new ColorPool();

    private constructor() {}

    init(){
        this.freeColors = [...this.colors];
        this.pool.clear();
    }
    
    getColor(id: number):string{
        if(!this.pool.has(id)){
            this.pool.set(id, this.freeColors.shift() ?? '');
        }
        return this.pool.get(id)!;
    }
}