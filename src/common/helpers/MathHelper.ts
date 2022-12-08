export default class MathHelper {
    static getRandomValue(max: number, min: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static getArrDifference(arr1: Array<any>, arr2: Array<any>) {
        return arr1.filter(x => !arr2.includes(x)).concat(arr2.filter(x => !arr1.includes(x)));
    }

    static transposeMatrix(matrix: any[][]) {
        return matrix[0]
            .map((col, i) => matrix
                .map(row => row[i]));
    }

    static clamp(value: number, lower: number, upper: number){
        if(value > upper) return upper;
        if(value < lower) return lower;
        return Math.abs(value);
    }

    static swap(array: any[], from:number, to: number ){
        const copiedArr = [...array];
        const tempValue = copiedArr[from];
        copiedArr[from] =  copiedArr[to];
        copiedArr[to] = tempValue;
        return copiedArr;
    }
}